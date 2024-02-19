import React, { useState, useEffect, useContext} from 'react';
import { appContext } from '../../utils/appContext';
import { Link } from "react-router-dom";
import { Coronavirus } from '@mui/icons-material';

function StudentDash() {

  const { user , submitted } = useContext(appContext)

  const course = user.course === undefined ? 'No Course assigned' : user.course
  const courseTeachers = user.course === undefined ? 'No Teacher assigned' : user.course.teachers
  const report_card = user.report_card === undefined || null || [] ? '_' : user.report_card.grade

  return (
      <div className='dashboard'>
        <div className='dashboard-content'>
          <h1 className='dash-header'> Welcome, {user.name}</h1>
          <h3>Selected Course :</h3>
          <div className='card'>
            <Link to={`/courses/${course.id}`}>
              <div className='card-title'>
                <h2>{course.course_name}</h2>
              </div>
            </Link>
          </div>
          <div className='card-container'>
            <div className='details-card'>
              <div id='orange' className='div-card'><span>Units to Study</span><h3>{course.content.length}</h3></div>
              <div id='pink' className='div-card'><span>Submitted Assignments</span><h3>{user.assignments.length}</h3></div>
              <div id='green' className='div-card'><span>Current Grade</span><h3>{report_card}</h3></div>
              <div id='firebrick' className='div-card'><span>Saved Items</span><h3>2</h3></div>
            </div>
            <div className='teacher-list'>
              <h2>Teachers</h2>
              <div className='list-container'>
                {courseTeachers.map((teacher)=>(
                  <div className='list' key={teacher.id}>
                    <div className='teacher-details'>
                    <img id='teacher-img'src='./images/user1.png' alt={teacher.firstname} />
                    <p>{`${teacher.firstname} ${teacher.lastname}`}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div> 
          </div>
        </div>
      </div>
  );
}

export default StudentDash;
