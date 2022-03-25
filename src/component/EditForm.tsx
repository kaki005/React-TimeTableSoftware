import React, {useContext} from "react";
import { ECategory } from "../model/Subject";
import SubjectManager from "../model/SubjectsManager";
import { formContext, manager } from "../App";


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
interface IProp {
    semester : number
}


const EditForm :React.FC<IProp> = (prop :IProp) =>{
    const {selectedSubject, setSubject, TimeTable, setTimeTable} = useContext(formContext);
    // 値をリセット
    const Clear = () => {
        setSubject({
            ...selectedSubject,
            id : selectedSubject.id,
            isRegistered: false,
            tempName: "",
            tempDegree : 2,
            tempCategory : ECategory.A,
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

    // 科目の削除
    const DeleteSubject = () => {
        manager.DeleteSubject( prop.semester, selectedSubject.id);
        setTimeTable(manager.GetTimeTable(prop.semester));
    };

    // 値の変化時
    const onChanged= (e :(React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>))=>{
        const name :string = e.target.name;
        setSubject({
            ...selectedSubject,
           [name] : e.target.value
        });
    }

    // 科目情報の変更
    const onSubmit = (e: React.FormEvent) =>{
        e.preventDefault();
        manager.ChangeSubject(prop.semester, selectedSubject.id, selectedSubject.tempName, selectedSubject.tempColor, selectedSubject.tempDegree, selectedSubject.tempCategory);
        setTimeTable(manager.GetTimeTable(prop.semester));
        setSubject({
            ...selectedSubject,
            canEdit : false,
        });
        
    }

    const RegisterSubject =() =>{
        manager.RegisterSubject(prop.semester, selectedSubject.id, selectedSubject.tempName, selectedSubject.tempColor, selectedSubject.tempDegree, selectedSubject.tempCategory, true);
        setTimeTable(manager.GetTimeTable(prop.semester));
        setSubject({
            ...selectedSubject,
            canEdit : false,
        });
    }

    const RegisterExistingSubject = () =>{
        manager.RegisterSubject(prop.semester, selectedSubject.id, selectedSubject.tempName, selectedSubject.tempColor, selectedSubject.tempDegree, selectedSubject.tempCategory, false);
        setTimeTable(manager.GetTimeTable(prop.semester));
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
                    {manager.GetSubjectList(prop.semester).map(key => key.SubjectName !== ""  ? <option>{key.SubjectName}</option> : null)}
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