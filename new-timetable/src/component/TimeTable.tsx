
import React, {useState} from "react";

import Subject, { ECategory } from "../model/Subject";
import TableCell from "./TimeTableCell";
import { MouseEvent } from "react";
import SaveSubjects from "../model/JsonManager";
import SubjectManager from "../model/SubjectsManager";
import { time } from "console";
import Counter from "./Counter";

interface IProp {
    //subjects : Subject[],
}

  const headers = ["","月", "火", "水", "木", "金"];
    const times = [1, 2, 3, 4, 5];
  const defaultSub : Subject = new  Subject("", [], "white", 2, ECategory.None);
  const colorList: {[name:string] : string} = {
    "黄色" : "#FFFF66",
    "水色" : "#99FFFF",
    "ピンク": "#FFAAFF",
    "緑"  : "#93FFAB",
    "青" : "#75A9FF",
    "灰色" : "#BBBBBB",
    "赤": "#FF519",
    "白": "white",
  };
  const toNameList: {[name:string] : string} = {};
  Object.keys(colorList).forEach(name => { 
        toNameList[colorList[name]] = name;
  });
  const manager = new SubjectManager();


const TimeTable :React.FC<IProp> = (props : IProp) => {
    // 初期化
    //const initalSubject = new Subject("aa", [2], "");
    //const CELL_MAX = 10* (times.length + 1);
    const [TimeTable, setTimeTable] = useState(manager.TimeTable);
    const [selectedSubject, setSubject] = useState({
        id : 0,
        isRegistered: false,
        tempColor: "",
        tempName: "",
        tempDegree : 2,
        tempCategory : ECategory.None,
        //subject : defaultSub,
        selectOption: "new"
    });
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
        
    }

    const setDataForm = (e :MouseEvent<HTMLElement>) =>{
        let idstr = e.currentTarget.dataset.id as string;
        let id = parseInt(idstr, 10);
        // eslint-disable-next-line
        if(TimeTable[id] != undefined) {
            setSubject({
                id: id,
                isRegistered: true,
                tempColor : toNameList[TimeTable[id].Color],
                tempName : TimeTable[id].SubjectName,
                tempDegree  : TimeTable[id].Degree,
                tempCategory: TimeTable[id].Category,
                //subject : TimeTable[id].Clone(),
                selectOption : "new"
            });
        }
        else {      // 登録されていなければ
            setSubject({
                id: id,
                isRegistered: false,
                tempColor : colorList[defaultSub.Color],
                tempName : defaultSub.SubjectName,
                tempDegree  : defaultSub.Degree,
                tempCategory: defaultSub.Category,
                //subject: defaultSub,
                selectOption : "new"
            });
        }
    }

    const RegisterSubject =() =>{
        TimeTable[selectedSubject.id] = new Subject(selectedSubject.tempName, [selectedSubject.id], colorList[selectedSubject.tempColor], selectedSubject.tempDegree, selectedSubject.tempCategory);
        setTimeTable(TimeTable);
    }

    const RegisterExistingSubject = () =>{
        alert(selectedSubject.tempName);
        const sub : (Subject | undefined) = TimeTable.find(x => x != undefined && x.SubjectName === selectedSubject.tempName);
        sub?.AddTime(selectedSubject.id);
        if(sub != undefined){
            alert("succeeded");
            TimeTable[selectedSubject.id] = sub;
        }
        else { alert("aqaa");}
        setTimeTable(TimeTable);
    }


    const handleBeforeUnload = (e :any) =>{
        SaveSubjects(TimeTable);
    }
    window.addEventListener('beforeunload', handleBeforeUnload);

    // 描画
    return (
    <div className="Container">
    <div className="TableContainer">   
        <table className="TimeTable">
            <thead>
                <tr >
                    {headers.map((head, idx) => {
                        return <th key={idx}>{head}</th>
                    })}
                </tr>
            </thead>
            <tbody>
            {times.map((time, idx1) =>{
                return<tr key={idx1}>
                    <th key={0}>{time}</th>
                    {headers.map((data, idx2) => {
                        if(idx2 === headers.length-1 ) return null; 
                        return <th  data-id={idx1*10+idx2} onClick={setDataForm} key={idx2+1}>
                            <TableCell subject={TimeTable[idx1*10+idx2]} />
                        </th>
                    })}
                </tr>
            })}
            </tbody>
        </table>
    </div>

    <div className="FormContainer">
        <h3>{headers[selectedSubject.id%10+1]}曜日{Math.floor(selectedSubject.id/10)+1}限目</h3>
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
            <table>
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
                            {manager.Categories.map(value => value !=="" ? <option key={value}>{value}</option> : null)}
                        </select>
                    </th>
                </tr>
                </tbody>
            </table>
            }
        </form>
    
            {selectedSubject.isRegistered ?
                <div>
                    <button onClick={onSubmit}>変更を保存</button>
                    <button onClick={DeleteSubject}>削除</button>

                    <button onClick={Clear}>クリア</button>
                </div>
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
            <Counter subject={TimeTable}/>
    </div>
</div>);
};
export default TimeTable;