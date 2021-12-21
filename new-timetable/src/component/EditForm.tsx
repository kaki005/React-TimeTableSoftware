import { parse } from "querystring";
import React, {useState, useContext, useRef } from "react";
import { ECategory } from "../model/Subject";
import Subject from "../model/Subject";
import SubjectManager from "../model/SubjectsManager";
import { formContext } from "../App";
import SaveSubjects from "../model/JsonManager";
import userEvent from "@testing-library/user-event";


const defaultSub : Subject = new  Subject("", [], "white", 2, ECategory.None);
const headers = ["月", "火", "水", "木", "金"];
export const colorList: {[name:string] : string} = {
    "黄色" : "#FFFF66",
    "水色" : "#99FFFF",
    "ピンク": "#FFAAFF",
    "緑"  : "#93FFAB",
    "青" : "#75A9FF",
    "灰色" : "#BBBBBB",
    "赤": "#FF5190",
    "白": "white",
  };
export const toNameList: {[name:string] : string} = {};
Object.keys(colorList).forEach(name => { 
        toNameList[colorList[name]] = name;
  });
const manager = SubjectManager.Instance;

const EditForm :React.FC = () =>{
    const {selectedSubject, setSubject, TimeTable, setTimeTable} = useContext(formContext);
    // 値をリセット
    const Clear = () => {
        setSubject({
            ...selectedSubject,
            id : selectedSubject.id,
            isRegistered: false,
            tempName: "",
            tempDegree : 2,
            tempCategory : ECategory.None,
        });
    }
    /*const Cancel = () =>{
        setSubject({
            ...selectedSubject,
            tempName: selectedSubject.subject.SubjectName,
            tempDegree: selectedSubject.subject.Degree,
            tempColor: selectedSubject.subject.Color,
            tempCategory: selectedSubject.subject.Category,
        });
    }*/

    const DeleteSubject = () => {
        if(TimeTable[selectedSubject.id].Time.length > 1) {
            TimeTable[selectedSubject.id].ReduceTime(selectedSubject.id);
        }
        TimeTable[selectedSubject.id] = defaultSub;
        setTimeTable(TimeTable);
    };
    const onChanged= (e :(React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>))=>{
        const name :string = e.target.name;
        setSubject({
            ...selectedSubject,
           [name] : e.target.value
        });
    }

    const onSubmit = (e: React.FormEvent) =>{
        e.preventDefault();
        if(TimeTable[selectedSubject.id].Time.length> 1) {
            let ans = window.confirm("同じ授業の他の時間のデータも変更しますか？");
            if(ans === true) {
                TimeTable[selectedSubject.id].ChangeData(selectedSubject.tempName, colorList[selectedSubject.tempColor], selectedSubject.tempDegree, selectedSubject.tempCategory);
            }
            else {
                TimeTable[selectedSubject.id].ReduceTime(selectedSubject.id);
                TimeTable[selectedSubject.id] = new Subject(selectedSubject.tempName,  [selectedSubject.id] ,colorList[selectedSubject.tempColor], selectedSubject.tempDegree, selectedSubject.tempCategory);
            }
        }
        else {
            TimeTable[selectedSubject.id].ChangeData(selectedSubject.tempName, colorList[selectedSubject.tempColor], selectedSubject.tempDegree, selectedSubject.tempCategory);
        }
        setTimeTable([...TimeTable]);
        setSubject({
            ...selectedSubject,
            canEdit : false,
        });
        
    }

    const RegisterSubject =() =>{
        TimeTable[selectedSubject.id] = new Subject(selectedSubject.tempName, [selectedSubject.id], colorList[selectedSubject.tempColor], selectedSubject.tempDegree, selectedSubject.tempCategory);
        setTimeTable(TimeTable);
        setSubject({
            ...selectedSubject,
            canEdit : false,
        });
    }

    const RegisterExistingSubject = () =>{
        const sub : (Subject | undefined) = TimeTable.find(x => x != undefined && x.SubjectName === selectedSubject.tempName);
        sub?.AddTime(selectedSubject.id);
        if(sub != undefined){
            TimeTable[selectedSubject.id] = sub;
        }
        setTimeTable(TimeTable);
        setSubject({
            ...selectedSubject,
            canEdit : false,
        });
    }

    const StartEdit = () => {
        setSubject({
            ...selectedSubject,
            canEdit : true
        })
    }

    const handleBeforeUnload = (e :any) =>{
        SaveSubjects(TimeTable);
    }
    window.addEventListener('beforeunload', handleBeforeUnload);


    return <div className="Form">
        <h3>{headers[selectedSubject.id%10]}曜日{Math.floor(selectedSubject.id/10)+1}限目</h3>
        <form>
            {selectedSubject.isRegistered
                ? null
                : (<div>
                    <input  type="radio" name="selectOption" value="new" onChange={onChanged} checked={selectedSubject.selectOption === "new"}/>新しく科目を作成して登録<br />
                    <input  type="radio" value="existing" name="selectOption" onChange={onChanged} checked={selectedSubject.selectOption === "existing"} />既存の科目を登録
                </div>)
            }
            {selectedSubject.selectOption === "existing" && selectedSubject.isRegistered === false
            ?
                <select name="tempName" onChange={onChanged} value={selectedSubject.tempName}>
                    {manager.GetSubjectList().map(key => <option>{key.SubjectName}</option>)}
                </select>
            :
            <table className="FormTable">
                <thead>
                    <tr>
                        <th key={0}>教科名</th>
                        <th key={1}><input type="text"  key="inputName" value={selectedSubject.tempName} name="tempName" onChange={onChanged}/></th>
                    </tr>
                </thead>
                <tbody>
                <tr>
                    <th key={0}>単位</th>
                    <th key={1}>
                        <select  value={selectedSubject.tempDegree} name="tempDegree" onChange={onChanged}>
                            <option>1</option>
                            <option>2</option>
                        </select>
                    </th>
                </tr>
                <tr>
                    <th key={0}>色</th>
                    <th key={1}>
                        <select value={selectedSubject.tempColor} name="tempColor" onChange={onChanged}>
                            {Object.keys(colorList).map(key => <option key={key}>{key}</option>)}
                        </select>
                    </th>
                </tr>
                <tr>
                    <th key={0}>区分</th>
                    <th key={1}>
                        <select value={selectedSubject.tempCategory} name="tempCategory" onChange={onChanged}>
                            {manager.Categories.map((value, idx) => value !=="" ? <option key={idx+1}>{value}</option> : null)}
                        </select>
                    </th>
                </tr>
                </tbody>
            </table>
            }
        </form>
    
            {selectedSubject.isRegistered ?
                selectedSubject.canEdit? (<div>
                    <button onClick={onSubmit}>変更を保存</button>
                    <button onClick={DeleteSubject}>削除</button>
                    <button onClick={Clear}>クリア</button>
                </div>)
                : <button onClick={StartEdit}>編集</button>
            : selectedSubject.selectOption === "new"
                ?(<div>
                    <button onClick={RegisterSubject}>新規登録</button>
                    <button onClick={Clear}>クリア</button>
                </div>)
                :(
                    <div>
                        <button onClick={RegisterExistingSubject}>科目を登録</button>
                    </div>
                )
            
            }
    </div>

}
export default EditForm;