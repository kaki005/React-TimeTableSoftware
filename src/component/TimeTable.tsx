
import React, {useEffect, useContext} from "react";
import Subject, { ECategory } from "../model/Subject";
import TableCell from "./TimeTableCell";
import { formContext, manager, semesterTabContext } from "../App";
import { MouseEvent } from "react";
import SubjectManager from "../model/SubjectsManager";
import EditForm, {colorList, toNameList} from "./EditForm";

const defaultSub : Subject = new  Subject("", [], "", 2, ECategory.None);
const times = [1, 2, 3, 4, 5];
const headers = ["","月", "火", "水", "木", "金"];


interface IProp {
    semester : number
}

const TimeTables: React.VFC<IProp> = (prop :IProp) => {
    const {selectedSubject, setSubject, TimeTable, setTimeTable} = useContext(formContext);
    const {Semester, setSemester} = useContext(semesterTabContext);
    useEffect(
        () => setTimeTable(manager.GetTimeTable(prop.semester)),
        [Semester, setSemester]
    );
    // 選択されたコマのデータをフォームに登録
    const setDataForm = (e :MouseEvent<HTMLElement>) =>{
        let idstr = e.currentTarget.dataset.id as string;
        let id = parseInt(idstr, 10);
        // eslint-disable-next-line
        if(TimeTable[id] != undefined && TimeTable[id].SubjectName !== "") {
            setSubject({
                id: id,
                isRegistered: true,
                tempColor : toNameList[TimeTable[id].Color],
                tempName : TimeTable[id].SubjectName,
                tempDegree  : TimeTable[id].Degree,
                tempCategory: TimeTable[id].Category,
                selectOption : "new",
                canEdit : false,
            });
        }
        else {      // 登録されていなければ
            setSubject({
                id: id,
                isRegistered: false,
                tempColor : "",
                tempName : defaultSub.SubjectName,
                tempDegree  : defaultSub.Degree,
                tempCategory: defaultSub.Category,
                selectOption : "new",
                canEdit : true,
            });
        }
    }

    // 描画
    return (
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
        </table>);
};
export default TimeTables;