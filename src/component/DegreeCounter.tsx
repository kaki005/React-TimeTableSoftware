import React from "react";
import Subject, { ECategory, } from "../model/Subject";
import { manager } from "../App";
import CounterCell from "./DegreeCounterCell";
import "../DegreeCounter.css";

interface IProps {
    subject : Subject[],
    semester : number
};


const DegreeCounter : React.VFC<IProps>  = (props :IProps) =>{
    const [displayType, SetType] = React.useState("all");
    //let counts = manager.CountDegree(props.semester, displayType);
    let subjects = manager.ClassifyByCategory(props.semester, displayType);
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
                <label htmlFor="gotten" className="tab_item" >前学期まで</label> 
        </div>

        <div className="tab_content">
            <div className="DegreeCounter">
                {(() => {
                    const items = [];
                    for (let i = 1; i <= ECategory.専門その他; i++) {
                        items.push(<CounterCell categoryName={ECategory[i]} subjects={subjects[i]} key={i}/>);
                    }
                    items.push(<CounterCell categoryName={"専門合計"} subjects={subjects[subjects.length - 1]} key={subjects.length - 1}/>);
                    for (let i = ECategory.専門その他+1; i <= ECategory.その他; i++) {
                        items.push(<CounterCell categoryName={ECategory[i]} subjects={subjects[i]} key={i}/>);
                    }
                    return items;
                })()}
            </div>
        </div>
    </div>;
}; 
export default DegreeCounter;
