import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import Subject, {ECategory} from "./model/Subject";
import SubjectManager from './model/SubjectsManager';
import TimeTables from './component/TimeTable';
import EditForm, {colorList, toNameList} from "./component/EditForm";
import Counter from "./component/Counter";
import { FormProvider } from 'react-hook-form';


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
const manager = SubjectManager.Instance;


function App() {
  const [TimeTable, setTimeTable] = useState(manager.TimeTable);
  const [selectedSubject, setSubject] = useState({
        id : 0,
        isRegistered: false,
        tempColor: "",
        tempName: "",
        tempDegree : 2,
        tempCategory : ECategory.None,
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
        <div className='TableContainer' >
          <TimeTables/>
        </div>
        <div className="FormContainer">
          <EditForm />
          <Counter subject={TimeTable}/>
        </div>
      </formContext.Provider>
    </div>
  );
}

export default App;
