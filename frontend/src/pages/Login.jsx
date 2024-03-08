import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import '../styles/Login.css'
import video from '../img/bg.mp4';
import videoWebM from '../img/bgwm.webm';

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    // Submit the form to login
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!username || !password) {
            alert('Please fill in all fields')
        } else {
        // Send username and password to backend
        try{
            const res = await fetch('https://chat-app-api-id8w.onrender.com/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username,
                    password
                })
            })
          // If successful, do something with the response
          const data = await res.json();
          localStorage.setItem('token', data.token);
          localStorage.setItem('id', data.user._id);
          console.log('Data received from backend:', data);
          if(data) {
            window.location.href = `/chat`;
          }
          } catch (err) {
              console.log('Error submitting form:', err);
          }}
    };

  return (
    <div className='login'>
      <video src={video} type='video/mp4' autoPlay loop  className='bg'></video>
      <video src={videoWebM} type='video/webm' autoPlay loop className='bg'></video>
      <form className='loginForm'>
        <h1 className='loginTitle'>LOGIN</h1>
        <div className="inputs">
          <label htmlFor="username">Username:</label>
          <input type="text" value={username} id='username' name='username' onChange={(e) => setUsername(e.target.value)} /><br/>
        </div>
        <div className="inputs">
          <label htmlFor="password">Password:</label>
          <input type="password" value={password} id='password' name='password' onChange={(e) => setPassword(e.target.value)}/><br/>
        </div>
        <button className='loginBtn' type="submit" onClick={handleSubmit}>Login</button>
        <div className="registerTo">
          <p className="registerText">Don't have an account?</p>
          <Link to="/register" className='registerLink'>Register here</Link>
        </div>
      </form>
    </div>
  )
}

export default Login
