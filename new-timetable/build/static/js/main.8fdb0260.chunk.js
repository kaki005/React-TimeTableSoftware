(this["webpackJsonpnew-timetable"]=this["webpackJsonpnew-timetable"]||[]).push([[0],{13:function(e,t,n){},14:function(e,t,n){},16:function(e,t,n){"use strict";n.r(t);var c,i=n(8),r=n.n(i),a=(n(13),function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,17)).then((function(t){var n=t.getCLS,c=t.getFID,i=t.getFCP,r=t.getLCP,a=t.getTTFB;n(e),c(e),i(e),r(e),a(e)}))}),s=n(3),o=n(1),l=n.n(o),u=(n(14),n(4)),b=n(5),m=function(){function e(t,n,c,i,r){Object(u.a)(this,e),this.name=t,this.time=n,this.color=c,this.degree=i,this.category=r}return Object(b.a)(e,[{key:"SubjectName",get:function(){return this.name}},{key:"Time",get:function(){return this.time}},{key:"Color",get:function(){return this.color}},{key:"Degree",get:function(){return this.degree}},{key:"Category",get:function(){return this.category}},{key:"ChangeData",value:function(e,t,n,c){this.name=e,this.degree=n,this.color=t,this.category=c}},{key:"ReduceTime",value:function(e){this.time=this.time.filter((function(t){return t!==e}))}},{key:"AddTime",value:function(e){this.time.every((function(t){return t!==e}))&&this.time.push(e)}},{key:"Clone",value:function(){return new e(this.name,this.time,this.color,this.degree,this.category)}}]),e}();!function(e){e[e.None=0]="None",e[e.A=1]="A",e[e.B=2]="B",e[e.C=3]="C",e[e.D=4]="D",e[e.E=5]="E",e[e.F=6]="F",e[e.G=7]="G",e[e.H=8]="H",e[e["\u82f1\u8a9e"]=9]="\u82f1\u8a9e",e[e["\u57fa\u76e4\u6559\u990a"]=10]="\u57fa\u76e4\u6559\u990a",e[e["\u5c02\u9580\u57fa\u790e"]=11]="\u5c02\u9580\u57fa\u790e",e[e["\u305d\u306e\u4ed6"]=12]="\u305d\u306e\u4ed6"}(c||(c={}));var j="subjects";new m("",[],"white",2,c.None);var h=n(6),d=n(2),g=n(0),O=["\u6708","\u706b","\u6c34","\u6728","\u91d1"],f={"\u9ec4\u8272":"#FFFF66","\u6c34\u8272":"#99FFFF","\u30d4\u30f3\u30af":"#FFAAFF","\u7dd1":"#93FFAB","\u9752":"#75A9FF","\u7070\u8272":"#BBBBBB","\u8d64":"#FF5190","\u767d":"white"},p={};Object.keys(f).forEach((function(e){p[f[e]]=e}));var v=function(e){var t=Object(o.useContext)(B),n=t.selectedSubject,i=t.setSubject,r=(t.TimeTable,t.setTimeTable),a=function(){i(Object(d.a)(Object(d.a)({},n),{},{id:n.id,isRegistered:!1,tempName:"",tempDegree:2,tempCategory:c.A}))},s=function(e){var t=e.target.name;i(Object(d.a)(Object(d.a)({},n),{},Object(h.a)({},t,e.target.value)))};return Object(g.jsxs)("div",{className:"Form",children:[Object(g.jsxs)("h3",{children:[O[n.id%10],"\u66dc\u65e5",Math.floor(n.id/10)+1,"\u9650\u76ee"]}),Object(g.jsxs)("form",{children:[n.isRegistered?null:Object(g.jsxs)("div",{children:[Object(g.jsx)("input",{type:"radio",name:"selectOption",value:"new",onChange:s,checked:"new"===n.selectOption}),"\u65b0\u3057\u304f\u79d1\u76ee\u3092\u4f5c\u6210\u3057\u3066\u767b\u9332",Object(g.jsx)("br",{}),Object(g.jsx)("input",{type:"radio",value:"existing",name:"selectOption",onChange:s,checked:"existing"===n.selectOption}),"\u65e2\u5b58\u306e\u79d1\u76ee\u3092\u767b\u9332"]}),"existing"===n.selectOption&&!1===n.isRegistered?Object(g.jsx)("select",{name:"tempName",onChange:s,value:n.tempName,children:G.GetSubjectList(e.semester).map((function(e){return""!==e.SubjectName?Object(g.jsx)("option",{children:e.SubjectName}):null}))}):Object(g.jsxs)("table",{className:"FormTable",children:[Object(g.jsx)("thead",{children:Object(g.jsxs)("tr",{children:[Object(g.jsx)("th",{children:"\u6559\u79d1\u540d"},0),Object(g.jsx)("th",{children:Object(g.jsx)("input",{type:"text",value:n.tempName,name:"tempName",onChange:s},"inputName")},1)]})}),Object(g.jsxs)("tbody",{children:[Object(g.jsxs)("tr",{children:[Object(g.jsx)("th",{children:"\u5358\u4f4d"},0),Object(g.jsx)("th",{children:Object(g.jsxs)("select",{value:n.tempDegree,name:"tempDegree",onChange:s,children:[Object(g.jsx)("option",{children:"1"}),Object(g.jsx)("option",{children:"2"})]})},1)]}),Object(g.jsxs)("tr",{children:[Object(g.jsx)("th",{children:"\u8272"},0),Object(g.jsx)("th",{children:Object(g.jsx)("select",{value:n.tempColor,name:"tempColor",onChange:s,children:Object.keys(f).map((function(e){return Object(g.jsx)("option",{children:e},e)}))})},1)]}),Object(g.jsxs)("tr",{children:[Object(g.jsx)("th",{children:"\u533a\u5206"},0),Object(g.jsx)("th",{children:Object(g.jsx)("select",{value:n.tempCategory,name:"tempCategory",onChange:s,children:G.Categories.map((function(e,t){return""!==e?Object(g.jsx)("option",{children:e},t+1):null}))})},1)]})]})]})]}),n.isRegistered?n.canEdit?Object(g.jsxs)("div",{children:[Object(g.jsx)("button",{onClick:function(t){t.preventDefault(),G.ChangeSubject(e.semester,n.id,n.tempName,n.tempColor,n.tempDegree,n.tempCategory),r(G.GetTimeTable(e.semester)),i(Object(d.a)(Object(d.a)({},n),{},{canEdit:!1}))},children:"\u5909\u66f4\u3092\u4fdd\u5b58"}),Object(g.jsx)("button",{onClick:function(){G.DeleteSubject(e.semester,n.id),r(G.GetTimeTable(e.semester))},children:"\u524a\u9664"}),Object(g.jsx)("button",{onClick:a,children:"\u30af\u30ea\u30a2"})]}):Object(g.jsx)("button",{onClick:function(){i(Object(d.a)(Object(d.a)({},n),{},{canEdit:!0}))},children:"\u7de8\u96c6"}):"new"===n.selectOption?Object(g.jsxs)("div",{children:[Object(g.jsx)("button",{onClick:function(){G.RegisterSubject(e.semester,n.id,n.tempName,n.tempColor,n.tempDegree,n.tempCategory,!0),r(G.GetTimeTable(e.semester)),i(Object(d.a)(Object(d.a)({},n),{},{canEdit:!1}))},children:"\u65b0\u898f\u767b\u9332"}),Object(g.jsx)("button",{onClick:a,children:"\u30af\u30ea\u30a2"})]}):Object(g.jsx)("div",{children:Object(g.jsx)("button",{onClick:function(){G.RegisterSubject(e.semester,n.id,n.tempName,n.tempColor,n.tempDegree,n.tempCategory,!1),r(G.GetTimeTable(e.semester)),i(Object(d.a)(Object(d.a)({},n),{},{canEdit:!1}))},children:"\u79d1\u76ee\u3092\u767b\u9332"})})]})},x=new m("",[],"white",2,c.None),C=function(){function e(){var t=this;Object(u.a)(this,e),this.categories=Object.keys(c),this.timeTable=void 0,this.SaveTimeTable=function(){!function(e){var t=JSON.stringify(e.map((function(e){var t=new Array(e.length);return e.map((function(e,n){if(void 0!==e&&!t[n]&&""!==e.SubjectName)return e.Time.forEach((function(e){t[e]=!0})),{time:e.Time,name:e.SubjectName,color:e.Color,degree:e.Degree,category:e.Category}})).filter((function(e){return null!=e}))})).filter((function(e){return null!=e})));localStorage.setItem(j,t)}(t.timeTable)},this.timeTable=function(){for(var e,t=new Array(8),n=0;n<t.length;n++)t[n]=new Array;var c=null!==(e=localStorage.getItem(j))&&void 0!==e?e:"";return JSON.parse(c).forEach((function(e,n){var c=new Array(60);c=c.map((function(e){return!1})),e.length>0&&e.forEach((function(e){var i=new m(e.name,e.time,e.color,e.degree,e.category);i.Time.forEach((function(e){t[n][e]=i,c[e]=!0}))}))})),t}()}return Object(b.a)(e,[{key:"Categories",get:function(){return this.categories.filter((function(e){return"number"===typeof c[e]&&"None"!==e}))}},{key:"GetSubjectList",value:function(e){var t=new Array(this.timeTable.length);return this.timeTable[e-1].filter((function(e,n){var c;return void 0!==e&&null!==e&&(!t[n]&&(null===e||void 0===e||null===(c=e.Time)||void 0===c||c.forEach((function(e){return t[e]=!0})),!0))}))}},{key:"CountDegree",value:function(e,t){var n=[0,0,0,0,0,0,0,0,0,0,0,0,0,0];switch(t){case"all":for(var c=1;c<=8;c++)n=this.CountSemesterDegree(c,n);break;case"semester":n=this.CountSemesterDegree(e,n);break;case"gotten":for(var i=1;i<e;i++)n=this.CountSemesterDegree(i,n)}return n}},{key:"CountSemesterDegree",value:function(e,t){var n=new Array(this.timeTable[e-1].length);return n=n.map((function(e){return!1})),this.timeTable[e-1].forEach((function(e,i){if(null!=e&&void 0!=e&&!n[i]&&""!==e.SubjectName){e.Time.forEach((function(e){n[e]=!0}));var r=c[e.Category];t[parseInt(r)]+=e.Degree,t[t.length-1]+=e.Degree}})),t}},{key:"GetTimeTable",value:function(e){return this.timeTable[e-1]}},{key:"DeleteSubject",value:function(e,t){this.timeTable[e-1][t].Time.length>1&&this.timeTable[e-1][t].ReduceTime(t),this.timeTable[e-1][t]=x}},{key:"ChangeSubject",value:function(e,t,n,c,i,r){this.timeTable[e-1][t].Time.length>1?!0===window.confirm("\u540c\u3058\u6388\u696d\u306e\u4ed6\u306e\u6642\u9593\u306e\u30c7\u30fc\u30bf\u3082\u5909\u66f4\u3057\u307e\u3059\u304b\uff1f")?this.timeTable[e-1][t].ChangeData(n,f[c],i,r):(this.timeTable[e-1][t].ReduceTime(t),this.timeTable[e-1][t]=new m(n,[t],f[c],i,r)):this.timeTable[e-1][t].ChangeData(n,f[c],i,r)}},{key:"RegisterSubject",value:function(e,t,n,c,i,r,a){if(a){this.timeTable[e-1][t]=new m(n,[t],f[c],i,r),this.timeTable.forEach((function(e){return console.log(e[t])}))}else{var s=this.timeTable[e-1].find((function(e){return void 0!=e&&e.SubjectName===n}));null===s||void 0===s||s.AddTime(t),void 0!=s&&(this.timeTable[e-1][t]=s)}this.SaveTimeTable()}}]),e}(),T=function(e){var t,n,c={background:void 0===e.subject?"white":null===(t=e.subject)||void 0===t?void 0:t.Color,height:150};return Object(g.jsx)("div",{className:"Cell",style:c,children:void 0===e.subject?"":null===(n=e.subject)||void 0===n?void 0:n.SubjectName})},y=new m("",[],"white",2,c.None),S=[1,2,3,4,5],N=["","\u6708","\u706b","\u6c34","\u6728","\u91d1"],k=function(e){var t=Object(o.useContext)(B),n=(t.selectedSubject,t.setSubject),c=t.TimeTable,i=t.setTimeTable,r=Object(o.useContext)(R),a=r.Semester,s=r.setSemester;Object(o.useEffect)((function(){return i(G.GetTimeTable(e.semester))}),[a,s]);var l=function(e){var t=e.currentTarget.dataset.id,i=parseInt(t,10);void 0!=c[i]&&""!==c[i].SubjectName?n({id:i,isRegistered:!0,tempColor:p[c[i].Color],tempName:c[i].SubjectName,tempDegree:c[i].Degree,tempCategory:c[i].Category,selectOption:"new",canEdit:!1}):n({id:i,isRegistered:!1,tempColor:f[y.Color],tempName:y.SubjectName,tempDegree:y.Degree,tempCategory:y.Category,selectOption:"new",canEdit:!0})};return Object(g.jsxs)("table",{className:"TimeTable",children:[Object(g.jsx)("thead",{children:Object(g.jsx)("tr",{children:N.map((function(e,t){return Object(g.jsx)("th",{children:e},t)}))})}),Object(g.jsx)("tbody",{children:S.map((function(e,t){return Object(g.jsxs)("tr",{children:[Object(g.jsx)("th",{children:e},0),N.map((function(e,n){return n===N.length-1?null:Object(g.jsx)("th",{"data-id":10*t+n,onClick:l,children:Object(g.jsx)(T,{subject:c[10*t+n]})},n+1)}))]},t)}))})]})},F=function(e){var t=l.a.useState("all"),n=Object(s.a)(t,2),i=n[0],r=n[1],a=G.CountDegree(e.semester,i),o=function(e){r(e.target.name)};switch(i){case"all":document.documentElement.style.setProperty("--counter-color","#B384FF");break;case"semester":document.documentElement.style.setProperty("--counter-color","#FF82B2");break;case"gotten":document.documentElement.style.setProperty("--counter-color","#5BFF7F")}return Object(g.jsxs)("div",{className:"tabs",children:[Object(g.jsxs)("div",{children:[Object(g.jsx)("input",{className:"tab",type:"radio",name:"all",id:"all",checked:"all"===i,onChange:o}),Object(g.jsx)("label",{htmlFor:"all",className:"tab_item",children:"\u5408\u8a08"}),Object(g.jsx)("input",{className:"tab",id:"semester",type:"radio",name:"semester",checked:"semester"===i,onChange:o}),Object(g.jsx)("label",{htmlFor:"semester",className:"tab_item",children:"\u4eca\u5b66\u671f"}),Object(g.jsx)("input",{className:"tab",id:"gotten",type:"radio",name:"gotten",checked:"gotten"===i,onChange:o}),Object(g.jsx)("label",{htmlFor:"gotten",className:"tab_item",children:"\u53d6\u5f97\u6e08\u307f"})]}),Object(g.jsx)("div",{className:"tab_content",children:Object(g.jsxs)("table",{className:"DegreeCounter",children:[Object(g.jsx)("thead",{children:Object(g.jsx)("tr",{children:a.map((function(e,t){return t>0?Object(g.jsx)("th",{children:t!==a.length-1?c[t]:"\u5408\u8a08"},t):null}))})}),Object(g.jsx)("tbody",{children:Object(g.jsx)("tr",{children:a.map((function(e,t){return t>0?Object(g.jsx)("th",{children:e},t):null}))})})]})})]})},w=[1,2,3,4,5,6,7,8],D={background:"#5ab4bd",color:"black"},E={backgroud:"#d9d9d9",color:"#565656"},A=function(){var e=Object(o.useContext)(R),t=e.Semester,n=e.setSemester,c=function(e){n(parseInt(e.target.value))};return Object(g.jsxs)("div",{children:[w.map((function(e){return Object(g.jsx)("input",{type:"radio",checked:e===t,value:e,id:e.toString(),className:"tab",onChange:c},e)})),w.map((function(e){return Object(g.jsxs)("label",{htmlFor:e.toString(),className:"semester_tab_item",style:e==t?D:E,children:[e,"\u30bb\u30e1"]})}))]})},B=l.a.createContext({}),R=l.a.createContext({}),G=new C;window.addEventListener("beforeunload",(function(e){G.SaveTimeTable()}));var I=function(){var e=Object(o.useState)(1),t=Object(s.a)(e,2),n=t[0],i=t[1],r=Object(o.useState)(G.GetTimeTable(n)),a=Object(s.a)(r,2),l=a[0],u=a[1],b=l.length>0&&""!==l[0].SubjectName,m=Object(o.useState)({id:0,isRegistered:b,tempColor:"\u8d64",tempName:"",tempDegree:2,tempCategory:c.A,selectOption:"new",canEdit:!1}),j=Object(s.a)(m,2),h={selectedSubject:j[0],setSubject:j[1],TimeTable:l,setTimeTable:u};return Object(g.jsx)("div",{className:"App",children:Object(g.jsx)(B.Provider,{value:h,children:Object(g.jsxs)(R.Provider,{value:{Semester:n,setSemester:i},children:[Object(g.jsxs)("div",{className:"TableContainer",children:[Object(g.jsx)(A,{}),Object(g.jsx)(k,{semester:n})]}),Object(g.jsxs)("div",{className:"FormContainer",children:[Object(g.jsx)(v,{semester:n}),Object(g.jsx)(F,{subject:l,semester:n})]})]})})})};r.a.render(Object(g.jsx)(I,{}),document.getElementById("root")),a()}},[[16,1,2]]]);
//# sourceMappingURL=main.8fdb0260.chunk.js.map