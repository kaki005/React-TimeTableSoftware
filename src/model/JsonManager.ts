import Subject, { ECategory } from "./Subject";
import Consts from "../model/Consts";
type parseSubject = {
        time : number[],
        name : string,
        color : string,
        degree :number,
        category : ECategory
}
const STORAGE_NAME = "subjects";



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
    var subjects :Array<Array<Subject>> = new Array(Consts.SEMESTER_NUM);
    for (let i=0; i< subjects.length; i++) {
        subjects[i] = new Array<Subject>(Consts.SUBJECT_MAX_ID);
    }
    var json: string = localStorage.getItem(STORAGE_NAME) ?? "null";             // Json‚©‚çŽžŠÔŠ„“Ç‚Ýž‚Ý(‚È‚¯‚ê‚Înull)
    var parseObjects :parseSubject[][] = JSON.parse(json) as parseSubject[][];
    parseObjects?.forEach((subjectsPerSeme, idx) => {
        var registerdList: boolean[] = new Array(Consts.SUBJECT_MAX_ID);
        registerdList = registerdList.map(item => false);
        if(subjectsPerSeme.length > 0) {
            subjectsPerSeme.forEach(item => {
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