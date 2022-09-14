//import react from "react";

export default class Consts {
    static readonly SUBJECT_MAX_ID :number = 120;   // 時間割IDの最大数　(0-99:通常科目, 100-119:集中講義科目)
    static readonly SEMESTER_NUM = 8                // セメスターの数
    static readonly INTENSIVE_SUBJECT_ID = 100;     // 集中講義の時間割ID(これより大きいIDは集中講義)

    static readonly DAYS = ["月", "火", "水", "木", "金", "土", "日"];
    static readonly TIMES = [1, 2, 3, 4, 5, 6];
};

