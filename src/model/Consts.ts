//import react from "react";
import { ECategory } from "./Subject";

export default class Consts {
    static readonly SUBJECT_MAX_ID :number = 120;   // 時間割IDの最大数　(0-99:通常科目, 100-119:集中講義科目)
    static readonly SEMESTER_NUM = 8                // セメスターの数
    static readonly INTENSIVE_SUBJECT_ID = 100;     // 集中講義の時間割ID(これより大きいIDは集中講義)

    static readonly DAYS = ["月", "火", "水", "木", "金", "土", "日"];
    static readonly TIMES = [1, 2, 3, 4, 5, 6];

    static readonly CATEGORY_NUM: number = ECategory.その他 + 1;


    static readonly colorList: { [name: string]: string } = {
        "黄色": "#FFFF66",
        "水色": "#99FFFF",
        "ピンク": "#FFAAFF",
        "緑色": "#93FFAB",
        "青色": "#75A9FF",
        "灰色": "#BBBBBB",
        "赤色": "#FF5190",
        "オレンジ": "#FFCC66",
        "紫色": "#DCC2FF",
        "黄緑色": "#E9FFA5",
        "肌色": "#FFDEAD",
        "若葉色": "#DBFF71",
    };

    static readonly category2colorDic: { [name: string]: string } = {
        [ECategory[ECategory.None]] : "white",
        [ECategory[ECategory.A]] : "青色",
        [ECategory[ECategory.B]] : "緑色",
        [ECategory[ECategory.C]] : "黄色",
        [ECategory[ECategory.D]] : "ピンク",
        [ECategory[ECategory.E]] : "オレンジ",
        [ECategory[ECategory.F]] : "水色",
        [ECategory[ECategory.G]] : "灰色",
        [ECategory[ECategory.専門必修]] : "赤色",
        [ECategory[ECategory.専門その他]] : "灰色",
        [ECategory[ECategory.英語]] : "黄緑色",
        [ECategory[ECategory.第二外国語]]: "黄緑色",
        [ECategory[ECategory.基盤教養]]: "肌色",
        [ECategory[ECategory.学扉]]: "肌色",
        [ECategory[ECategory.専門基礎]]: "紫色",
        [ECategory[ECategory.その他]]: "灰色",
    }
};


type EnumDictionary<T extends string | symbol | number, U> = { [K in T]: U; };

