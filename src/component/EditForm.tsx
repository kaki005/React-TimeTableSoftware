import React, {useContext} from "react";
import { ECategory } from "../model/Subject";
import { formContext, manager } from "../App";


const headers = ["月", "火", "水", "木", "金", "土", "日"];
export const colorList: {[name:string] : string} = {
    "黄色" : "#FFFF66",
    "水色" : "#99FFFF",
    "ピンク": "#FFAAFF",
    "緑色"  : "#93FFAB",
    "青色" : "#75A9FF",
    "灰色" : "#BBBBBB",
    "赤色": "#FF5190",
    "オレンジ" : "#FFCC66",
    "紫色" : "#DCC2FF",
    "黄緑色" : "#CCFF00",
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
            tempColor : "",
            tempCategory : ECategory.None,
        });
    }

    // 科目の削除
    const DeleteSubject = () => {
        manager.DeleteSubject( prop.semester, selectedSubject.id);
        setTimeTable(manager.GetTimeTable(prop.semester));
    };

    // 値の変化時
    const onChanged= (e :(React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>))=>{
        const name :string = e.target.name;
        let value = e.target.value;
        if(name == "tempCategory" && e.target.value === "") {
            value = "None";
        }
        setSubject({
            ...selectedSubject,
           [name] : value
        });
    }

    // 科目情報の変更
    const onSubmit = (e: React.FormEvent) =>{
        e.preventDefault();
        manager.ChangeSubject(prop.semester, selectedSubject.id, selectedSubject.tempName, selectedSubject.tempColor, selectedSubject.tempDegree, selectedSubject.tempCategory);
        setTimeTable(manager.GetTimeTable(prop.semester));
        
    }

    const IsProperInput = ()  :boolean => {
        if(selectedSubject.tempName == null || selectedSubject.tempName === "") {
            alert("科目名を入力してください。");
            return false;
        }
        if(TimeTable.some(item => item != undefined && item != null && item.SubjectName === selectedSubject.tempName)) {
            alert("その科目名は既に登録されています。\n既存の項目から登録してください。");
            return false;
        }
        if(selectedSubject.tempColor == null || selectedSubject.tempColor === "") {
            alert("科目の色を選択してください。");
            return false;
        }
        if(selectedSubject.tempDegree == null || selectedSubject.tempDegree <= 0) {
            alert("単位数を選択してください");
            return false;
        }
        if(selectedSubject.tempCategory == null || selectedSubject.tempCategory == ECategory.None) {
            alert("カテゴリを選択してください");
            return false;
        }
        return true;
    }

    const RegisterSubject =() =>{
        if(!IsProperInput()) {
            return;
        }
        manager.RegisterSubject(prop.semester, selectedSubject.id, selectedSubject.tempName, selectedSubject.tempColor, selectedSubject.tempDegree, selectedSubject.tempCategory, true);
        setTimeTable(manager.GetTimeTable(prop.semester));
    }

    const RegisterExistingSubject = () =>{
        if(selectedSubject.tempName == null || selectedSubject.tempName === "") {
            alert("登録する科目が選択されていません");
            return ;
        }
        manager.RegisterSubject(prop.semester, selectedSubject.id, selectedSubject.tempName, selectedSubject.tempColor, selectedSubject.tempDegree, selectedSubject.tempCategory, false);
        setTimeTable(manager.GetTimeTable(prop.semester));
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
                    <option></option>
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
                            <option>3</option>
                            <option>4</option>
                        </select>
                    </th>
                </tr>
                <tr>
                    <th key={0}>色</th>
                    <th key={1}>
                        <select value={selectedSubject.tempColor} name="tempColor" onChange={onChanged}>
                            <option></option>
                            {Object.keys(colorList).map(key => <option key={key}>{key}</option>)}
                        </select>
                    </th>
                </tr>
                <tr>
                    <th key={0}>区分</th>
                    <th key={1}>
                        <select value={selectedSubject.tempCategory} name="tempCategory" onChange={onChanged}>
                            {manager.Categories.map((value, idx) => value !=="" ? <option key={idx+1}>{value !== "None" ? value : null}</option> : null)}
                        </select>
                    </th>
                </tr>
                </tbody>
            </table>
            }
        </form>
    
            {selectedSubject.isRegistered ?
                (<div>
                    <button onClick={onSubmit}>変更を保存</button>
                    <button onClick={DeleteSubject}>削除</button>
                    <button onClick={Clear}>クリア</button>
                </div>)
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