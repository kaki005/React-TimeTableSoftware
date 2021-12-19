import { parse } from "querystring";
import React, {useState} from "react";
import { ECategory } from "../model/Subject";
import Subject from "../model/Subject";
import SubjectManager from "../model/SubjectsManager";



/*interface IProps  {
    subject: Subject | null,
    manager: SubjectManager
};
const headers = ["月", "火", "水", "木", "金"];
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

const EditForm :React.FC<IProps> = (props :IProps) =>{
    const [selectedSubject, setSubject] = React.useState({
        id : 0,
        isRegistered: false,
        tempColor: "",
        tempName: "",
        tempDegree : 2,
        tempCategory : ECategory.None,
        subject : props.subject
    });
    // 値をリセット
    const Clear = () => {
        setSubject({
            ...selectedSubject,
            isRegistered: false,
            tempName: "",
            tempDegree : 2,
            tempCategory : ECategory.None,
        });
    }
    const Cancel = () =>{
        setSubject({
            ...selectedSubject,
            tempName: selectedSubject.subject.SubjectName,
            tempDegree: selectedSubject.subject.Degree,
            tempColor: selectedSubject.subject.Color,
            tempCategory: selectedSubject.subject.Category,
        });
    }
    const onChanged= (e :(React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>))=>{
        const name :string = e.target.name;
        setSubject({
            ...selectedSubject,
           [name] : e.target.value
        });
    }

    return (
        <div className="FormContainer">
            <h3>{headers[selectedSubject.id%10]}曜日{Math.floor(selectedSubject.id/10)+1}限目</h3>
            <form>
            <input type="radio" name="isOriginal">既存の科目を登録</input>
            <input type="radio" name="isOriginal">新しい科目を登録</input>
            <table>
                <tr>
                    <th key={0}>教科名</th>
                    <th key={1}><input type="text" value={selectedSubject.tempName} name="tempName" onChange={onChanged}/></th>
                </tr>
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
                            {Object.keys(colorList).map(key => <option>{key}</option>)}
                        </select>
                    </th>
                </tr>
                <tr>
                    <th key={0}>区分</th>
                    <th key={1}>
                        <select value={selectedSubject.tempCategory} name="tempCategory" onChange={onChanged}>
                            {props.manager.Categories.map(key => <option>{key}</option>)}
                        </select>
                    </th>
                </tr>
            </table>
            </form>
    
            {selectedSubject.isRegistered ?
                <div>
                    <button onClick={onSubmit}>変更を保存</button>
                    <button onClick={Cancel}>もとに戻す</button>
                    <button onClick={Clear}>クリア</button>
                </div>
                : <div>
                    <button onClick={RegisterSubject}>新規登録</button>
                    <button onClick={Clear}>クリア</button>
                </div>
            
            }
        </div>
    );
};*/
//export default EditForm;