import React, { useState , useRef} from 'react';
import { toast } from 'react-toastify';
import emailjs from '@emailjs/browser'


function ContactForm() {

const [data, setData] = useState({username:"", email:"", subject:"", message:""})
const form = useRef()

const handleChange =(e)=>{
   const id = e.target.id;
   const value = e.target.value;
   setData({...data, [id]:value})}

const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_goldworth', 'goldworth_emails', form.current, {
        publicKey: '3237e9qnPZzyV85DW',
      })
      .then(
        (r) => {
            toast.success(`Email sent successfully!`);
        },
        (error) => {
            toast.error(`Failed ... ${error.text}`);
        },
      );

    e.target.reset()
  };

  return (
    <form ref={form} className='form' method='post' onSubmit={handleSubmit}>
        <h2 className='contact-heading'>Contact <span>Us</span></h2>
        <input type='text' id='username' name ='username' placeholder='Username' onChange={handleChange} value={data.username}/>
        <input type='email' id='email' name = 'user_email' placeholder='Email Address' onChange={handleChange} value={data.email} required/>
        <input type='text' id='subject' name = 'subject' placeholder='Subject' onChange={handleChange} value={data.subject} required/>
        <textarea name='message' id='message' cols='30' rows='10' placeholder='Type your message here...' onChange={handleChange} value={data.message}/>
        <button className='button' type='submit'>Submit</button>
    </form>
  )
}

export default ContactForm