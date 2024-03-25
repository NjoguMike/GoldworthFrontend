import React, { useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import GradingComp from './components/GradingComp'
import DownloadButton from './components/DownloadComp'
import { appContext } from './utils/appContext'

 function Assignment({ assignments }) {

    const { assignmentID } = useParams()
    const { session } = useContext(appContext)
    const assignment = assignments.filter((assignment)=> assignment.id === parseInt(assignmentID))[0]

    let downloadLink = `/assignment-file/${assignmentID}`
    const grade = <GradingComp assignment={assignment}>Grade</GradingComp>
    // console.log(assignment)
    // { Object.keys(assignment).includes('grade') ? <GradingComp assignment={assignment}>Grade</GradingComp> : }

  return (
    <div className='assignment'>
        <div>
            <h1>{assignment.assignment_name}</h1>
            <div className='assignment-container'>
                <h3>{assignment.topic}</h3>
                <p>{assignment.content}</p>
                <div className='assignment-files'>
                  <h3>Assignment Files</h3>
                    <DownloadButton url={downloadLink} buttonName={assignment.assignment_file}/>
                </div>
            </div>
            {session.user_type === 'student' ? <Link className='btn' to={`/assignments/submit/${assignment.id}`}>Submit</Link> : grade}
        </div>
    </div>
  )
}
export default Assignment