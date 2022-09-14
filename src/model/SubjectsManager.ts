import Subject, { ECategory } from './Subject';
import { GetSubjects } from './JsonManager';
import SaveSubjects from './JsonManager';
import { colorList } from '../component/EditForm';
import Consts from "../model/Consts";
const defaultSub : Subject = new  Subject("", [], "white", 2, ECategory.None);


class SubjectManager {
    constructor () {
        this.timeTable = GetSubjects();
    }

    // カテゴリー
    get Categories() {
        return this.categories.filter((key:any) => (typeof(ECategory[key]) === "number"));
    }
    private categories = Object.keys(ECategory);


    // 科目のリストを取得(通常科目のみ)
    GetSubjectList(semester : number) :Subject[] {
        var checeked = new Array<boolean>(this.timeTable.length);
        return this.timeTable[semester-1].filter((item, idx)=>{
            if(item === undefined || item === null) return false;
            if (checeked[idx]) return false;
            if (idx >= Consts.INTENSIVE_SUBJECT_ID) return false;       // 集中講義なら除外
            item?.Time?.forEach(time => checeked[time] = true);
            return true;
        });
    };

    // 単位数を計算
    CountDegree(semester:number, countType:string) : number[] {
        var list : number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        switch(countType) {     
            case "all":         // すべてのセメスター
                for(let i = 1; i <= Consts.SEMESTER_NUM; i++) {
                    list = this.CountSemesterDegree(i, list);
                }
                break;
            case "semester":    // 表示中のセメスター
                list = this.CountSemesterDegree(semester, list);
                break;
            case "gotten":      // 以前のセメスター
                for(let i = 1; i < semester; i++) {
                    list = this.CountSemesterDegree(i, list);
                }
                break;
        }
        return list;
    }


    // 単位をカテゴリーごとに分類する
    ClassifyByCategory(semester: number, countType: string): Subject[][] {
        var list: Subject[][] = new Array<Subject[]>(Consts.CATEGORY_NUM+1);
        for (let i = 0; i < Consts.CATEGORY_NUM+1; i++) { list[i] = new Array<Subject>(); }
        switch (countType) {
            case "all":         // すべてのセメスター
                for (let i = 1; i <= Consts.SEMESTER_NUM; i++) {
                    list = this.ClassifyByCategorySub(i, list);
                }
                break;
            case "semester":    // 表示中のセメスター
                list = this.ClassifyByCategorySub(semester, list);
                break;
            case "gotten":      // 以前のセメスター
                for (let i = 1; i < semester; i++) {
                    list = this.ClassifyByCategorySub(i, list);
                }
                break;
        }
        return list;
    }



    // 指定セメスターの単位数の計算
    private CountSemesterDegree(semester:number, list:number[]) {
        let isRegistered = new Array<boolean>(this.timeTable[semester-1].length);
        isRegistered = isRegistered.map(_ => false);
        this.timeTable[semester-1].forEach((subject, id) => {
            if(subject != null && subject != undefined && !isRegistered[id] && subject.SubjectName !== "" ) {
                subject.Time.forEach(time => {isRegistered[time] = true});      // この科目は登録されている
                var str :string = ECategory[subject.Category];
                list[parseInt(str)] += Number(subject.Degree);
                if(parseInt(str) <= ECategory.専門その他) { list[list.length-1] = Number(list[list.length-1]) + Number(subject.Degree); }   // 専門科目なら合計に加える
            }
        });
        return list;
    }

    // 指定セメスターの科目をカテゴリーで分類
    private ClassifyByCategorySub(semester: number, list: Subject[][]) {
        let isRegistered = new Array<boolean>(this.timeTable[semester - 1].length);
        isRegistered = isRegistered.map(_ => false);
        this.timeTable[semester - 1].forEach((subject, id) => {
            if (subject != null && subject != undefined && !isRegistered[id] && subject.SubjectName !== "") {
                subject.Time.forEach(time => { isRegistered[time] = true });      // この科目は登録されている
                var str: string = ECategory[subject.Category];
                list[parseInt(str)].push(subject);                                                    // 指定のインデックスに加える
                if (parseInt(str) <= ECategory.専門その他) { list[list.length - 1].push(subject); }   // 専門科目なら合計に加える
            }
        });
        return list;
    }



    // 時間割の取得
    GetTimeTable(semester :number) :Subject[]  {
        return this.timeTable[semester-1].slice(0, this.timeTable[semester-1].length);
    }

    // 科目の削除
    DeleteSubject(semester:number, id:number ) {
        if (this.timeTable[semester-1][id].Time.length > 1) {
            this.timeTable[semester-1][id].ReduceTime(id);
        }
        this.timeTable[semester-1][id] = defaultSub;
    }

    // 科目情報の変更
    ChangeSubject(semester:number, id:number, name:string, color:string, degree:number, category:ECategory) {
        if(this.timeTable[semester-1][id].Time.length > 1 ) {
            let ans = window.confirm("同じ授業の他の時間のデータも変更しますか？");
            if(ans === true) {
                this.timeTable[semester-1][id].ChangeData(name, colorList[color], degree, category);
            }
            else {
                this.timeTable[semester-1][id].ReduceTime(id);
                this.timeTable[semester-1][id] = new Subject(name, [id], colorList[color], degree, category);
            }
        }
        else {
            this.timeTable[semester-1][id].ChangeData(name, colorList[color], degree, category);
        }
    }

    // 科目の登録
    RegisterSubject(semester: number, id: number, name:string, color:string, degree:number, category:ECategory, isNew: boolean) {
        if (isNew) {
            let table = this.timeTable[semester-1];
            table[id] = new Subject(name, [id], colorList[color], degree, category);
            this.timeTable.forEach(table => console.log(table[id]));
        }
        else {
            const sub : (Subject | undefined) = this.timeTable[semester-1].find(x => x != undefined && x.SubjectName === name);
            sub?.AddTime(id);
            if(sub != undefined){
                this.timeTable[semester-1][id] = sub;
            }
        }
        this.SaveTimeTable();
    }
    private timeTable : Subject[][];


    // 時間割の保存
    SaveTimeTable = () => {
        SaveSubjects(this.timeTable);
    }
}

export default SubjectManager;