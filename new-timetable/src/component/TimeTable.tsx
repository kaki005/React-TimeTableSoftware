
import React, {useState} from "react";

import Subject, { ECategory } from "../model/Subject";
import TableCell from "./TimeTableCell";
import { MouseEvent } from "react";
import SubjectManager from "../model/SubjectsManager";
import EditForm, {colorList, toNameList} from "./EditForm";
import Counter from "./Counter";

interface IProp {
    //subjects : Subject[],
}
const defaultSub : Subject = new  Subject("", [], "white", 2, ECategory.None);
const headers = ["","月", "火", "水", "木", "金"];
const times = [1, 2, 3, 4, 5];
const manager = SubjectManager.Instance;

interface IFormInfo {
    id: number;
    isRegistered: boolean;
    tempColor: string;
    tempName: string;
    tempDegree: number;
    tempCategory: ECategory;
    selectOption: string;
    canEdit : boolean;
}


export const formContext = React.createContext({} as {
    selectedSubject :IFormInfo
    setSubject : React.Dispatch<React.SetStateAction<IFormInfo>>,
    TimeTable : Subject[],
    setTimeTable : React.Dispatch<React.SetStateAction<Subject[]>>
});

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
        selectOption: "new",
        canEdit : false,
    });
    const formValue = {
        selectedSubject,
        setSubject,
        TimeTable,
        setTimeTable,
    };

    

    // 選択されたコマのデータをフォームに登録
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
                selectOption : "new",
                canEdit : false,
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
                selectOption : "new",
                canEdit : true,
            });
        }
    }


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
        <formContext.Provider value={formValue}>
        <EditForm />
        </formContext.Provider>
        <Counter subject={TimeTable}/>
    </div>
</div>);
};
export default TimeTable;