import React from "react";
import Subject, { ECategory, } from "../model/Subject";
import SubjectsManager from "../model/SubjectsManager";
import {manager} from "../App";

interface IProps {
    subject : Subject[],
    semester : number
};

const Counter : React.VFC<IProps>  = (props :IProps) =>{
    const [displayType, SetType] = React.useState("all");
    let counts = manager.CountDegree(props.semester, displayType);
    const onChanged= (e :(React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>))=>{
        SetType(e.target.name);
    };
    switch (displayType) {
        case "all":
            document.documentElement.style.setProperty("--counter-color", "#B384FF");
            break;
        case "semester" :
            document.documentElement.style.setProperty("--counter-color", "#FF82B2");
            break;
        case "gotten":
            document.documentElement.style.setProperty("--counter-color", "#5BFF7F");
            break;
    }
    
    return <div className="tabs">
        <div>
            <input className="tab" type="radio" name="all" id="all" checked={displayType === "all"} onChange={onChanged}/>
                <label htmlFor="all" className="tab_item" >合計</label> 
            <input className="tab" id="semester" type="radio" name="semester" checked={displayType === "semester"} onChange={onChanged}/>
                <label htmlFor="semester" className="tab_item" >今学期</label> 
            <input className="tab"  id="gotten" type="radio" name="gotten" checked={displayType === "gotten"} onChange={onChanged}/>
                <label htmlFor="gotten" className="tab_item" >取得済み</label> 
        </div>

        <div className="tab_content">
                <table className="DegreeCounter">
                    <thead>
                        <tr>
                            {counts.map((count, idx) => idx > 0 ? <th key={idx}>{idx !== counts.length-1 ? ECategory[idx] : "合計"}</th> : null)}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            {counts.map((count, idx) => idx > 0 ? <th key={idx}>{count}</th> : null) }
                        </tr>
                    </tbody>
                </table>
        </div>
    </div>;
}; 
export default Counter;