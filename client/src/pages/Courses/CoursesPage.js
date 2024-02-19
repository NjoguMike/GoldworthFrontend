import { Link } from "react-router-dom";

function CoursesPage({ coursesList }) {

// console.log(coursesList)
  return (
    <div>
      <div className="course-cont">
        <h1 className="course-header">All Courses</h1>
      </div>
      <div className='course-list'>
        {coursesList.map((course) => (
          <div className='course-card-content' key={course.id}>
            <img
              id='courses-img'
              src={`http://localhost:5555/course-image/${course.id}`}
              alt={course.course_name}
            />
            <h3 id='course-header'>{course.course_name}</h3>
            <Link to={`/courses/${course.id}`}>
              <button className='courses-btn' >View Course</button>
              </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CoursesPage;
