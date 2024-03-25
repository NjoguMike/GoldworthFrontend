import DownloadButton from "./components/DownloadComp";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import AssignmentModule from "./AssignmentModule";
import { appContext } from "./utils/appContext";

function Assignments({ assignmentList , setAssignmentList }){

    const { user, session , assignments , submitted } = useContext(appContext)
    const [ classValue , setClassValue] = useState('assignments')

    const assignmentlist = session.user_type === 'student' ? user.assignments : submitted

    function handleClick(e){
        const id = e.target.id
        setClassValue(id)
        
        id === 'submitted' ? setAssignmentList(assignmentlist) : setAssignmentList(assignments)
    }

    function UtilityMenu(){
        return (
            <div className="assignment-bar">
                <Link onClick={()=>toast.warn('Please select an Assignment first!')}>Grade Assignment</Link>
                <Link to={"/new"}>Add Assignment</Link>
            </div>
        )
    }

    return(
        <div className="assignments">
            <div className="tabs">
                <button id="assignments" className={classValue === 'submitted' ? 'no-active' : 'active' } onClick={(e)=>handleClick(e)}>View Assignments <span>{assignments.length}</span></button>
                <button id="submitted" className={classValue === 'assignments' ? 'no-active' : 'active'} onClick={(e)=>handleClick(e)}>View Submitted <span>{assignmentlist.length}</span></button>
            </div>
            <div>
            {session.user_type === 'teacher' ? <UtilityMenu /> : null}
            <AssignmentModule assignments={assignmentList}/>
            </div>      
          </div>
    )
}

export default Assignments