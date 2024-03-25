import { useContext, useEffect, useState } from "react";
import DownloadPDF from "./components/DownloadPDF";
import { appContext } from "./utils/appContext"
import './styles/Reportcard.css';


function ReportCard({ student }) {

  const [reportData, setReportData] = useState([]);
  const { session , user } = useContext(appContext)

  // Accessing properties
  const profile = session.user_type === 'student' ? user : student
  const studentName = profile.name;
  const studentEmail = profile.email;
  const studentImageURL = profile.image_url;
  const studentID = profile.student_id;
  const courseName = profile.course ? profile.course.course_name : "No course";
  const courseId = profile.course ? profile.course.id : '_';
  const assignments = profile.assignments ? profile.assignments : "No content covered yet"

  // console.log(user)

  return (
    <div className='report-card'>
      <div id="report-card">
        <div className="header">
          <h1>Report Card</h1>
        </div>
        <div className="student-info">
          <div className="student-course">
            <h4>Course Code: LMS_{courseId}</h4>
            <h4>Course Name: {courseName}</h4>
          </div>
          <div className="student-details">
            <h4>Student_Id: {studentID}</h4>
            <div>
              <h4>{studentName}</h4>
              <h4>{studentEmail}</h4>
            </div>
          </div>


        </div>
        <div className="table-container">
          <h3>Attendance: 90%</h3>
          <table className="report-card-table">
            <thead>
              <tr>
                <th>Unit Name</th>
                <th>Unit Grade</th>
                <th>Remarks</th>
              </tr>
            </thead>
            <tbody>
              {assignments.map((unit) => (
                <tr key={unit.id}>
                  <td>{unit.assignment_name}</td>
                  <td>{unit.grade}</td>
                  <td>{unit.remarks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
      <div><DownloadPDF downloadElement={'report-card'} /></div>
    </div>
  );
};

export default ReportCard;



