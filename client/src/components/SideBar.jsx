import { Link } from 'react-router-dom'
import React, { useContext, useState } from 'react';
import '../styles/Sidebar.css';
import { GoCommentDiscussion } from "react-icons/go";
import { TbReportAnalytics } from "react-icons/tb";
import { FaRegCalendarAlt } from "react-icons/fa";
import { MdOutlineLibraryBooks } from "react-icons/md";
import { appContext } from '../utils/appContext';

function SideBar() {

  const [ toggle, setToggle ] = useState(true)
  const { session } = useContext(appContext)

  const toggleClass = ()=>{
    return 'toggled'
  }
  return (
    <div className='menu'>
      <div className='menu-toggle' onClick={toggleClass}>
          <span className='toggler'></span>
          <span className='toggler'></span>
          <span className='toggler'></span>
      </div>
      <div className='menu-list'>
        <Link to={'/assignments'} className='item'><MdOutlineLibraryBooks className='icon'/> Assignments</Link>
        {session.user_type === 'student' || 'parent' ? <Link to={'/reportcard'} className='item'><TbReportAnalytics className='icon'/> ReportCard</Link> : null}
        <Link to={'/calendar'} className='item'><FaRegCalendarAlt className='icon'/> Calendar</Link>
        <Link to={'/forums'} className='item'><GoCommentDiscussion className='icon'/> Forums</Link>
      </div>
    </div>
  )
}

export default SideBar;
