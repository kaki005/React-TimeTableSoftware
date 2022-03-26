import { debug } from "console";
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
const defaultSub : Subject = new  Subject("", [], "white", 2, ECategory.None);

export default function SaveSubjects (tableList: Subject[][]) {
    // eslint-disable-next-line
    let json = JSON.stringify(
        tableList.map(table => {
            let isRegistered = new Array<boolean>(table.length);
            return table.map((subject, id)=>{
                if(!(subject === undefined) && !isRegistered[id] && subject.SubjectName !== "") {
                    subject.Time.forEach(time => {isRegistered[time] = true});
                    return {
                        "time" : subject.Time,
                        "name" : subject.SubjectName,
                        "color": subject.Color,
                        "degree": subject.Degree,
                        "category": subject.Category,
                    }
                }
            }).filter(subject => subject != null);
        }).filter(subject => subject != null)
    );
    localStorage.setItem(STORAGE_NAME, json);
}

export function GetSubjects() : Subject[][] {
    const CELL_MAX = 10* (5 + 1);
    const SEMESTER_NUM = 8
    var subjects :Array<Array<Subject>> = new Array(SEMESTER_NUM);
    for (let i=0; i< subjects.length; i++) {
        subjects[i] = new Array<Subject>();
    }
    var json:string = localStorage.getItem(STORAGE_NAME) ?? "null";
    var subjectList :parseSubject[][] = JSON.parse(json) as parseSubject[][];
    subjectList?.forEach((list, idx) => {
        var registerdList : boolean[] = new Array(CELL_MAX);
        registerdList = registerdList.map(item => false);
        if(list.length > 0) {
            list.forEach(item => {
                var sub = new Subject(item.name, item.time, item.color, item.degree, item.category);
                sub.Time.forEach((time)=>{
                    subjects[idx][time] = sub;
                    registerdList[time] = true;
                })
            });
        }
    })
    return subjects;
}