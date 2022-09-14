/// 集中講義用の時間割テーブルコンポーネント

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


const TimeTableIntensive: React.VFC<IProp> = (prop :IProp) => {
    const {selectedSubject, setSubject, TimeTable, setTimeTable} = useContext(formContext);
    const {Semester, setSemester} = useContext(semesterTabContext);
    useEffect(
        () => setTimeTable(manager.GetTimeTable(prop.semester)),
        [Semester, setSemester]
    );                      // 表示セメスターが変更されたら再描画


    // 選択されたコマのデータをフォームに登録
    const setFormExistSubject = (id : number) =>{
        // eslint-disable-next-line
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

    const setFormNewSubject = (e: MouseEvent<HTMLElement>) => {
        for (let i = Consts.INTENSIVE_SUBJECT_ID; i < Consts.SUBJECT_MAX_ID; i++) {
            if (TimeTable[i] != null) continue;         // 登録されていれば次のID
            setSubject({
                id: i,
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

    // 描画
    // 時間割ID= 10*[時限ID (0-5)] + [曜日ID (0-6)]
    return (
        <div className= "IntensiveSubjects">
            <h4>集中講義</h4>
            <div className="IntensiveSubjectsBox">
                    {TimeTable.map((subject, idx) => {
                        if (idx < Consts.INTENSIVE_SUBJECT_ID) return null
                        if (subject== null || subject.SubjectName == "") return null;
                        return <th onClick={(e) => setFormExistSubject(idx)} style={{ width:"120px" }}>
                            <TableCell subject={subject} />
                        </th>
                    })}
            </div>
            <button className="btn btn-primary" onClick={setFormNewSubject}>新規追加</button>
        </div>);
};
export default TimeTableIntensive;