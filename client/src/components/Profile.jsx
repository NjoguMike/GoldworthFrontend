
function Profile({ user , session }) {

  return (
      <div className="nav-pane">
        <div className='profile-details'>
            <div className="profile-info">
                <img src="https://goldworth-backend.onrender.com/profile-image" alt='user'/>
                <span><h3 className="info-title"></h3><h4>{session.user_type === 'student' ? `Student_Id : ${user.student_id}` : `Teacher_Id :${user.teacher_id}`}</h4></span>
                <p>{user.email}</p>
            </div>
            <div className='profile-banner'>
             <p className='profile-banner-text'>
               <q>A programming language is for thinking about programs, not for expressing programs you’ve already thought of. 
                  It should be a pencil, not a pen
              </q>
              <br/><br/>Paul Graham.</p>
            </div>
        </div>
      </div>
  );
};

export default Profile;
