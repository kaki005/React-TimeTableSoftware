import React, {useState} from 'react';
import './App.css';
import Subject, {ECategory} from "./model/Subject";
import SubjectManager from './model/SubjectsManager';
import TimeTables from './component/TimeTable';
import EditForm from "./component/EditForm";
import Counter from "./component/Counter";
import { SemesterTab } from './component/semsterTab';


interface IFormInfo {
  id: number;
  isRegistered: boolean;
  tempColor: string;
  tempName: string;
  tempDegree: number;
  tempCategory: ECategory;
  selectOption: string;
  canEdit : boolean;
}


export const formContext = React.createContext({} as {
  selectedSubject :IFormInfo
  setSubject : React.Dispatch<React.SetStateAction<IFormInfo>>,
  TimeTable : Subject[],
  setTimeTable : React.Dispatch<React.SetStateAction<Subject[]>>
});
export const semesterTabContext = React.createContext({} as {
  Semester : number,
  setSemester : React.Dispatch<React.SetStateAction<number> >
})

export const manager = new SubjectManager();

const handleBeforeUnload = (e :any) =>{
  manager.SaveTimeTable();
}
window.addEventListener('beforeunload', handleBeforeUnload);
function App() {
  const [Semester, setSemester] = useState(1);
  const [TimeTable, setTimeTable] = useState(manager.GetTimeTable(Semester));
  let registered = TimeTable.length > 0 && TimeTable[0].SubjectName !== "";
  const [selectedSubject, setSubject] = useState({
        id : 0,
        isRegistered: registered,
        tempColor: "赤",
        tempName: "",
        tempDegree : 2,
        tempCategory : ECategory.A,
        selectOption: "new",
        canEdit : false,
    });
    const formValue = {
        selectedSubject,
        setSubject,
        TimeTable,
        setTimeTable,
    };


  return (
    <div className="App">
      <formContext.Provider value={formValue}>
      <semesterTabContext.Provider value={{Semester, setSemester}} >

        <div className='TableContainer' >
            <SemesterTab />
          <TimeTables semester={Semester}/>
        </div>
        <div className="FormContainer">
          <EditForm semester={Semester}/>
          <Counter subject={TimeTable} semester={Semester}/>
        </div>
      </semesterTabContext.Provider>
      </formContext.Provider>
    </div>
  );
}

export default App;
