import React from "react";
import Subject, { ECategory, } from "../model/Subject";
import "../DegreeCounter.css";
import {manager} from "../App";
import { useState } from 'react';

interface ICellProps {
    categoryName: string,
    subjects: Subject[],
};
interface IToolTipProps {
    subjects: Subject[],
}


const CounterCell: React.VFC<ICellProps> = (props: ICellProps) => {
    const [showTip, setShowTip] = useState(false);
    var degree = 0;
    props.subjects.forEach(item => { degree += Number(item.Degree); });
    const ShowToolTip = () => {
        if (props.subjects.length <= 0) return;
        setShowTip(true);
    }



    return <div className="CounterCell" onMouseEnter={() => ShowToolTip()} onMouseLeave={() => setShowTip(false)} >
        <h6 className="CounterCellHead">{props.categoryName}</h6>
        <h5>{degree}</h5>
        {showTip && <Tooltip subjects={ props.subjects}/>}
    </div>;
};
export default CounterCell;



const Tooltip: React.VFC<IToolTipProps> = (props: IToolTipProps) => {
    return <div className="Tooltip" >
        <table>
            <tbody>
                {props.subjects.map(item =>  <tr >{item.SubjectName}</tr> )}
            </tbody>
        </table>
    </div>;
};