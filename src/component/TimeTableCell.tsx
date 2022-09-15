import React from 'react';
import Subject from "../model/Subject";
import "../TimeTable.css";

interface IProps {
    subject : Subject | null | undefined
};


const TableCell: React.VFC<IProps>= (props : IProps)=> {
    const style = {
        background: props.subject === undefined ?"white" : props.subject?.Color,
        height :150
    };
    return (
        <div className="Cell"  style={style}>
            {props.subject === undefined ? "" : props.subject?.SubjectName}
        </div>
    );
}

export default TableCell;