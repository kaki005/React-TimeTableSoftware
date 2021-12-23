import React, {useContext} from "react";
import { semesterTabContext } from "../App";

const semesters = [1, 2, 3, 4, 5, 6, 7, 8];
const selectedStyle = {
    background : "#5ab4bd",
    color : "black"
}
const defaultStyle = {
    backgroud : "#d9d9d9",
    color : "#565656"
}

export const SemesterTab : React.VFC = () =>{
    const {Semester, setSemester} = useContext(semesterTabContext);
    const onChanged = (e :(React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>)) => {
        setSemester(parseInt(e.target.value));
    }
    return <div>
        {semesters.map(seme => 
            <input type="radio" checked={seme === Semester} value={seme} id={seme.toString()} className="tab" onChange={onChanged} key={seme}/>
        )}
        {semesters.map(seme => <label htmlFor={seme.toString()} className="semester_tab_item" style={seme == Semester ? selectedStyle : defaultStyle}>{seme}セメ</label>)}
    </div>
}