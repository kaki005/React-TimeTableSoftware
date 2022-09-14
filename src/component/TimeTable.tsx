/// 通常講義用の時間割テーブルコンポーネント

import React, {useEffect, useContext} from "react";
import Subject, { ECategory } from "../model/Subject";
import TableCell from "./TimeTableCell";
import { formContext, manager, semesterTabContext } from "../App";
import { MouseEvent } from "react";
import { toNameList } from "./EditForm";
import Consts from "../model/Consts";

const defaultSub : Subject = new  Subject("", [], "", 2, ECategory.None);

interface IProp {
    semester : number
}


const TimeTables: React.VFC<IProp> = (prop :IProp) => {
    const {selectedSubject, setSubject, TimeTable, setTimeTable} = useContext(formContext);
    const {Semester, setSemester} = useContext(semesterTabContext);
    useEffect(
        () => setTimeTable(manager.GetTimeTable(prop.semester)),
        [Semester, setSemester]
    );                      // 表示セメスターが変更されたら時間割内容を再描画


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
    // 時間割ID= 10*[時限ID (0-5)] + [曜日ID (0-6)]   
    return (
        <table className="TimeTable">
            <thead>
                <tr >
                    <th key={0}></th>
                    {Consts.DAYS.map((day, idx) => {                    // 曜日ごとに
                        return <th key={idx+1}>{day}</th>           // 曜日
                    })}
                </tr>
            </thead>
            <tbody>
            {Consts.TIMES.map((time, idx1) =>{
                return<tr key={idx1}>
                    <th key={0}>{time}</th>
                    {Consts.DAYS.map((data, idx2) => {
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