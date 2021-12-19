import Subject, { ECategory } from './Subject';
import { GetSubjects } from './JsonManager';

export default class SubjectManager {
    constructor() {
        [this.timeTable, this.isRegistered] = GetSubjects();
    }
    private isRegistered : boolean[];

    get TimeTable() :Subject[]  {
        return this.timeTable;
    }
    private timeTable : Subject[];

    get Categories() {
        return this.categories.filter((key:any) => (typeof(ECategory[key]) === "number" && key !== "None"));
    }
    private categories = Object.keys(ECategory);

    GetSubject(id: number) : Subject {
        return this.timeTable[id];
    }


    GetSubjectList() :Subject[] {
        var checeked = new Array<boolean>(this.timeTable.length);
        return this.timeTable.filter((item, idx)=>{
            if(item === undefined || item === null) return false;
            if(checeked[idx]) return false;
            item?.Time?.forEach(time => checeked[time] = true);
            return true;
        });
    };

    CountDegree(subjects : Subject[]) : number[] {
        var list : number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        let isRegistered = new Array<boolean>(subjects.length);
        isRegistered = isRegistered.map(item => false);
        subjects.forEach((subject, id) => {
            if(subject != null && subject != undefined && !isRegistered[id] && subject.SubjectName !== "" ) {
                subject.Time.forEach(time => {isRegistered[time] = true});
                var str :string = ECategory[subject.Category];
                list[parseInt(str)] += subject.Degree;
                list[list.length-1] += subject.Degree;
            }
        });
        return list;
    }

    

}