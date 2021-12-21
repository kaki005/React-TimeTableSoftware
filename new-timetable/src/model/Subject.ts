//import react from "react";


export default class Subject {
    constructor(private name:string, private time:number[], private color:string, private degree:number, private category:ECategory) {};

    get SubjectName() :string
    {
        return this.name;
    }
    get Time() :number[] {
        return this.time;
    }

    get Color() :string {
        return this.color;
    } 
     
    get Degree() :number {
        return this.degree;
    }

    get Category() :ECategory {
        return this.category;
    }

    ChangeData(name:string, color:string, degree:number, category:ECategory): void {
        this.name = name;
        this.degree = degree;
        this.color = color;
        this.category = category;
    }

    ReduceTime(time: number){
        this.time = this.time.filter(item => item !== time);
    }

    AddTime(time :number) {
        if(this.time.every(num => num !== time)) this.time.push(time);
    }

    Clone() :Subject {
        return new Subject(this.name, this.time, this.color, this.degree, this.category);
    }
};

export enum ECategory {
    None,
    A,
    B,
    C,
    D,
    E,
    F,
    G,
    H,
    "英語",
    "基盤教養",
    "専門基礎",
    "その他",
}

interface ITranslator {
    [id: string]: string;
}
