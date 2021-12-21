import { stringify } from "querystring";
import Subject, { ECategory } from "./Subject";
type parseSubject = {
        time : number[],
        name : string,
        color : string,
        degree :number,
        category : ECategory
}
const STORAGE_NAME = "subjects";

export default function SaveSubjects (subjects: Subject[]) {
    let isRegistered = new Array<boolean>(subjects.length);
    // eslint-disable-next-line
    let json = JSON.stringify(subjects.map((subject, id)=>{
        if(!(subject === undefined) && !isRegistered[id]) {
            subject.Time.forEach(time => {isRegistered[time] = true});
            return {
                "time" : subject.Time,
                "name" : subject.SubjectName,
                "color": subject.Color,
                "degree": subject.Degree,
                "category": subject.Category,
            }
        }
    }).filter(subject => subject != null));
    localStorage.setItem(STORAGE_NAME, json);
}

export function GetSubjects() : [Subject[], boolean[]] {
    const CELL_MAX = 10* (5 + 1);
    var subjects :Array<Subject> = new Array(CELL_MAX);
    var registerdList : boolean[] = new Array(CELL_MAX);
    registerdList = registerdList.map(item => false);
    var json:string = localStorage.getItem(STORAGE_NAME) ?? "";
    var list :parseSubject[] = JSON.parse(json) as parseSubject[];
    list.forEach(item => {
        var sub = new Subject(item.name, item.time, item.color, item.degree, item.category);
        sub.Time.forEach((time)=>{
            subjects[time] = sub;
            registerdList[time] = true;
        })
    });
    return [subjects, registerdList];
}