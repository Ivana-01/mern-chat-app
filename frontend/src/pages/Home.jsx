import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/Home.css'
import video from '../img/bg.mp4';
import videoWebM from '../img/bgwm.webm';

const Home = () => {
  return (
    <div className='home'>
      <video src={video} type='video/mp4' autoPlay loop className='bg'></video>
      <video src={videoWebM} type='video/webm' autoPlay loop className='bg'></video>
        <div className="homeContainer">
          <h2 className="homeSubtitle">Welcome to</h2>
          <h1 className="homeTitle">CHAT APP</h1>
          <p className='homeText'>Connect with people now</p>
          <div className="buttons">
            <Link to="/login" className='homeLink'>Login</Link>
            <Link to="/register" className='homeLink'>Register</Link>
          </div>
        </div>
    </div>
  )
}

export default Home