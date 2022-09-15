/// 通常講義用の時間割テーブルコンポーネント

import React, {useEffect, useContext, useState} from "react";
import Subject, { ECategory } from "../model/Subject";
import TableCell from "./TimeTableCell";
import { formContext, manager, semesterTabContext } from "../App";
import { toNameList } from "./EditForm";
import Consts from "../model/Consts";
import "../TimeTable.css";
import { ECANCELED } from "constants";

const defaultSub : Subject = new  Subject("", [], "", 2, ECategory.None);

interface IProp {
    semester : number
}


const TimeTables: React.VFC<IProp> = (prop :IProp) => {
    const {selectedSubject, setSubject, TimeTable, setTimeTable} = useContext(formContext);
    const { Semester, setSemester } = useContext(semesterTabContext);
    const [showWeekend, setShowWeekend] = useState(false);



    useEffect(() => {
        setTimeTable(manager.GetTimeTable(prop.semester));
    }, [Semester, setSemester]);             // 表示セメスターが変更されたら時間割内容を
    useEffect(() => { setDataForm(0); CheckShowWeekend(); }, [TimeTable, setTimeTable]);

    // 選択されたコマのデータをフォームに登録
    const setDataForm = (id: number) => {
        // eslint-disable-next-line
        if (TimeTable[id] != undefined && TimeTable[id].SubjectName !== "") {
            setSubject({
                id: id,
                isRegistered: true,
                tempColor: toNameList[TimeTable[id].Color],
                tempName: TimeTable[id].SubjectName,
                tempDegree: TimeTable[id].Degree,
                tempCategory: TimeTable[id].Category,
                selectOption: "new",
                canEdit: false,
            });
        }
        else {      // 登録されていなければ
            setSubject({
                id: id,
                isRegistered: false,
                tempColor: "",
                tempName: defaultSub.SubjectName,
                tempDegree: defaultSub.Degree,
                tempCategory: defaultSub.Category,
                selectOption: "new",
                canEdit: true,
            });
        }
    };

    // 週末を表示するかどうかのチェック
    const CheckShowWeekend = () => {
        TimeTable.forEach((item, idx) => {
            if (item === undefined || item === null || item.SubjectName === "") return;
            if (idx % 10 > 4 && idx < Consts.INTENSIVE_SUBJECT_ID) { setShowWeekend(true); console.log(item.SubjectName);}  // 土日科目があれば土日も表示
        });
    };


    // 描画
    // 時間割ID= 10*[時限ID (0-5)] + [曜日ID (0-6)]   
    return (
        <div>
            <div className="form-check form-check-inline ShowWeekend" onClick={(e) => setShowWeekend(!showWeekend)}>
                <input className="form-check" type="radio" name="selectOption" value="new" checked={showWeekend} onChange={() => { } }/>
                <label >週末の表示切替え</label>
            </div>
            <table className="TimeTable">
            <thead>
                <tr >
                    <th key={0}></th>
                    {Consts.DAYS.map((day, idx) => {                    // 曜日ごとに
                        return (!showWeekend && idx > 4)
                            ? null
                            :  <th key={idx + 1}>{day}</th>           // 曜日
                    })}
                </tr>
            </thead>
            <tbody>
            {Consts.TIMES.map((time, idx1) =>{
                return<tr key={idx1}>
                    <th key={0}>{time}</th>
                    {Consts.DAYS.map((data, idx2) => {
                        return (() => {
                            if (!showWeekend && idx2 > 4) return null;          // 週末を表示するか
                            return <th data-id={idx1 * 10 + idx2} onClick={(e) => setDataForm(parseInt((e.currentTarget.dataset.id as string), 10))} key={idx2 + 1}>
                                <TableCell subject={TimeTable[idx1 * 10 + idx2]} />
                            </th>
                        })()
                        
                    })}
                </tr>
            })}
            </tbody>
            </table>
        </div>
        );
};
export default TimeTables;