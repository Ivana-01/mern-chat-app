import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import '../styles/Register.css'
import video from '../img/bg.mp4';
import videoWebM from '../img/bgwm.webm';

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [fullName, setFullName] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [gender, setGender] = useState('')


    // Submit the form to login
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(username, password, fullName, confirmPassword, gender);
        if (!username || !password || !fullName || !confirmPassword || !gender) {
            alert('Please fill in all fields')
        }
        if (password.length < 8) {
            alert('Password must be at least 8 characters long')
        }
        if (password !== confirmPassword) {
            alert('Passwords do not match')
        }
        // Send username and password to backend
        try{
            const res = await fetch('https://chat-app-api-id8w.onrender.com/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username,
                    password,
                    fullName,
                    confirmPassword,
                    gender
                })
            })
        // If successful, do something with the response
        const data = await res.json();
        console.log('Data received from backend:', data);
        window.location.href = '/login'
        } catch (err) {
            console.log('Error submitting form:', err);
        }
    };
 return (
    <div className='register'>
      <video src={video} type='video/mp4' autoPlay loop className='bg'/>
      <video src={videoWebM} type='video/webm' autoPlay loop className='bg'/>
      <form className='registerForm'>
        <h1 className='registerTitle'>REGISTER</h1>
        <div className="inputs">
          <label htmlFor="fullName">Full name:</label>
          <input type="text" value={fullName} id='fullName' name='fullName' onChange={(e) => setFullName(e.target.value)} required/><br/>
        </div>
        <div className="inputs">
          <label htmlFor="username">Username:</label>
          <input type="text" value={username} id='username' name='username' onChange={(e) => setUsername(e.target.value)} required/><br/>
        </div>
        <div className="inputs">
          <label htmlFor="password">Password:</label>
          <input type="password" value={password} id='password' name='password' onChange={(e) => setPassword(e.target.value)} required/><br/>
        </div>
        <div className="inputs">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input type="password" value={confirmPassword} id='confirmPassword' name='confirmPassword' onChange={(e) => setConfirmPassword(e.target.value)} required/><br/>
        </div>
        <div className="genderInput">
          <label className='genderLabel' htmlFor="gender">Select your gender:</label>
          <div className="genderRadio">
            <input className='radio' type="radio" value={"male"} id="gender-male" name="gender" onChange={(e) => setGender(e.target.value)}/>
            <label className='radioLabel' htmlFor="gender-male"><span className='newRadio'></span>Male</label>
          </div>
          <div className="genderRadio">
            <input className='radio' type="radio" value={"female"} id="gender-female" name="gender" onChange={(e) => setGender(e.target.value)}/>
            <label className='radioLabel' htmlFor="gender-female"><span className='newRadio'></span>Female</label>
          </div>
        </div>
        <button className='registerBtn' type="submit" onClick={handleSubmit}>Register</button>
        <div className="loginTo">
          <p className="loginText">Already have an account?</p>
          <Link className='loginLink' to="/login">Login here</Link>
        </div>
      </form>
    </div>
  )
}

export default Login
