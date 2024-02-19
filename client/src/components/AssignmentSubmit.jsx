import { useState, useContext } from 'react'
import { appContext } from '../utils/appContext'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'


function AssignmentSubmit({ assignments }) {


    const { user } = useContext(appContext)
    const { assignmentID } = useParams()
    const assignment = assignments.filter((assignment)=> assignment.id === parseInt(assignmentID))[0]

    let report_card_id = user.report_card === null || undefined ? 0 : user.report_card[0].id

    const [toSubmit, setToSubmit] = useState({
      assignment_name: assignment.assignment_name,
      content: "",
      assignment_file:"",
      course_id: user.course.id,
      student_id: user.student_id,
      report_card_id: report_card_id,
    });

  function handleChange(e) {

  const id = e.target.id;
  const value = e.target.value;

  setToSubmit({ ...toSubmit, [id]: value })
  }

  function handleSubmit(e){
      e.preventDefault()

      const formData = new FormData(e.target)

      Object.keys(toSubmit).map((key)=>{
      formData.append(key, toSubmit[key])
      })

      fetch("/submitted-assignments/11",{
          method:"PATCH",
          body:formData,
      })
      .then((r)=>{
          if(r.ok){
              r.json().then((data)=>{
                toast.success('Assignment submitted successfully')
              })
          }
          else{
              throw new Error(r.status)
          }
      })
      .catch((error)=>toast.error(`${error} sorry something went wrong`))
  }

  return (
    <div className='assignment-submit'> 
        <h2>Submit Assignment</h2>
        <form id='assignment-submit-form' className="assignment-form" onSubmit={(e)=>handleSubmit(e)}  encType="multipart/form-data">
            <div className="form_item">
                <label htmlFor="assignment_name"> Assignment name: </label>
                <input
                    type="text"
                    id="assignment_name"
                    value={assignment.assignment_name}
                    autoComplete="on"
                    onChange={handleChange}
                />
            </div>
            <div className="form_item">
                <label htmlFor="content"> Content: </label>
                <textarea
                    type="text"
                    id="content"
                    cols='30'
                    rows='30'
                    value={toSubmit.content}
                    autoComplete="on"
                    onChange={handleChange}
                    placeholder='Add your content/links here...'
                />
            </div>
            <div className="form_item">
                <label htmlFor="assignment_file"> Assignment_file: </label>
                <input
                    type="file"
                    id='assignment_file'
                    name="assignment_file"
                    autoComplete="on"
                    onChange={handleChange}
                />
            </div>
            <button className="btn" type="submit">Submit Assignment</button>
        </form>
    </div>
  )
}

export default AssignmentSubmit