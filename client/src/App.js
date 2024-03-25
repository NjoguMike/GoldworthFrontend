import React, { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Route, Routes } from 'react-router-dom';
import ActiveCourse from './ActiveCourses';
import Assignment from './Assignment';
import AssignmentForm from './AssignmentCreation';
import Assignments from './Assignments';
import Calendar from './Calendar';
import Classes from './Classes';
import CoursePage from './pages/Courses/CoursePage';
import CoursesPage from './pages/Courses/CoursesPage';
import CreateEvent from './CreateEvent';
import Navbar from './Navbar';
import ParentDash from './pages/Dashboards/ParentDash';
import ReportCard from './ReportCard';
import StudentDash from './pages/Dashboards/StudentDash';
import TeacherDash from './pages/Dashboards/TeacherDash';
import TeacherHome from './TeacherHome';
import ChatBox from './components/chatBox';
import About from './pages/About/About';
import Dashboard from './pages/Dashboards/Dashboard';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import UserAuth from './utils/UserAuth';
import { appContext } from './utils/appContext';
import StudentList from './StudentList';
import IndividualStudent from './IndividualStudent';
import SavedDocs from './SavedDocs';
import AssignmentSubmit from './components/AssignmentSubmit';


function App() {
  const [courses, setCourse] = useState([])
  const [user, setUser] = useState("")
  const [session, setSession] = useState({"user_type":'', "user_details":'', 'user_image':''})
  const [assignments, setAssignments] = useState([])
  const [assignmentList, setAssignmentList] = useState(assignments)
  const [eventsList, setEventsList] = useState([])
  const [eventsDictionary, setEventsDictionary] = useState({})
  const [students, setStudents] = useState([]);
  const [ savedDocs , setSaved ] = useState([])
  const [ submitted , setSubmitted ] = useState([])

  useEffect(() => {
    fetch("https://goldworth-backend.onrender.com/assignments").then((response) => {
      if (response.ok) {
        response.json()
          .then((assignment) => {
            setAssignments(assignment)
            setAssignmentList(assignment)
          })
      }
    })
  }, [])

  console.log(courses)
  useEffect(() => {
    fetch("https://goldworth-backend.onrender.com/submitted-assignments").then((response) => {
      if (response.ok) {
        response.json()
          .then((submitted) => {
            setSubmitted(submitted)
          })
      }
    })
  }, [])

  function fetchEventData() {
    fetch("https://goldworth-backend.onrender.com/events")
      .then((response) => response.json())
      .then((eventData) => {
        eventData.forEach((event) => {
          eventsDictionary[event.id] = event;
        });

        setEventsList(eventData);
        setEventsDictionary(eventsDictionary);
      });

  }
  useEffect(() => fetchEventData(), []);

  function fetchCoursesData() {
    fetch("https://goldworth-backend.onrender.com/courses")
      .then((response) => response.json())
      .then((data) => {
        setCourse(data)
      });

  }
  useEffect(() => fetchCoursesData(), []);

  function handleUser(user){
    if("student_id" in user){
      setSession({user_type:"student", user_details:user})
    }
    else if("teacher_id" in user){
      setSession({user_type:"teacher", user_details:user})
    }
    else if("parent_id" in user){
      setSession({user_type:"parent", user_details:user})
    }
  }

  
  useEffect(() => {
    fetch("https://goldworth-backend.onrender.com/checksession").then((response) => {
      if (response.ok) {
        response.json()
          .then((sessionMember) => {
            handleUser(sessionMember)
            setUser(sessionMember)
          })
      }
    })
  }, [])

  function SetPage(){
    if(session.user_type === "student"){
      return (<StudentDash />)
      
    }
    else if(session.user_type === "teacher"){
      return <TeacherDash />
    }
    else if(session.user_type === "parent"){
      return <ParentDash/> 
    }
  }

  // function handleSaved(id){
  //   const saved = assignments.filter((assignment)=>assignment.id === parseInt(id))[0]
  //   setSaved({...savedDocs, saved})
  // }

  useEffect(() => {
    fetch('/students')
    .then((r)=>{
      if(r.ok){
        r.json()
        .then((data)=>{
          setStudents(data)
          // console.log(data)
        })
      }
      else{
        throw new Error('error')
      }
    })
    .catch((e)=>{
      return e
    })
}, []);



  return (

      <appContext.Provider value={{user , students , session , setSession , setUser , courses , assignments, submitted }}>
        <div className=''>
          <Navbar />
          <ToastContainer />
          <Routes>
            <Route path='/' element={<Home courses={courses}/>}/>
            <Route path='/about' element={<About />} />
            <Route path='/courses' element={<CoursesPage coursesList={courses} />} />
            <Route path='/courses/:courseID' element={<CoursePage coursesList={courses} />} />
            <Route path='/login' element={<Login setUser={setUser} setSession={setSession}/>} />
            <Route  element={<UserAuth user={user} />}>
              <Route element={<Dashboard />}>
                <Route path='/dashboard' element={<SetPage />} />
                <Route path='/calendar' element={<Calendar eventsList={eventsList}/>} />
                <Route path="/create-event" element={<CreateEvent user={user} setEvents={setEventsList}/>} />
                <Route path='/active-courses' element={<ActiveCourse />} />
                <Route path='/classes' element={<Classes />} />
                <Route path='/assignments' element={<Assignments assignmentList={assignmentList} setAssignmentList={setAssignmentList}/>}></Route>
                <Route path='/assignments/:assignmentID' element={<Assignment assignments={assignmentList}/>} />
                <Route path='/assignments/submit/:assignmentID' element={<AssignmentSubmit assignments={assignmentList}/>} />
                <Route path='/forums' element={<ChatBox />} />
                <Route path='/new' element={<AssignmentForm/>} />
                <Route path='/reportcard' element={<ReportCard />} />
                <Route path='/saved' element={<SavedDocs savedDocs={savedDocs} setDocs={setSaved}/>} />
              </Route>
            </Route>
            <Route
            path="/student-view"
            element={<StudentList />}
          />
          <Route
            path="/student-view/:studentID"
            element={<IndividualStudent />}
          />
          </Routes>
        </div>
      </appContext.Provider>
  );
}

export default App;


