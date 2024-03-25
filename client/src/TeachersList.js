import React, { useState, useEffect } from 'react';

function TeacherList() {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await fetch('https://goldworth-backend.onrender.com/teachers'); 
        const data = await response.json();
        setTeachers(data);
      } catch (error) {
        console.error('Error fetching teachers:', error);
      }
    };

    fetchTeachers();
  }, []); 

  return (
    <div>
      <h2>Teachers</h2>
      <ul>
        {teachers.map((teacher) => (
          <li key={teacher.id}>
            <h3>{`${teacher.firstname} ${teacher.lastname}`}</h3>
            <p>Expertise: {teacher.expertise}</p>
            <p>Department: {teacher.department}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TeacherList;
