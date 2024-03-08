import React from 'react'
import logout from '../img/logout.png'

const Logout = () => {
    const handleLogout = async (e) => {
        try{
            const res = await fetch('https://chat-app-api-id8w.onrender.com/api/auth/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const data = await res.json();
            localStorage.removeItem("token");
            console.log(data)
            window.location.href = '/'
        }
        catch(err){
            console.log(err)
        }
    }
  return (
    <button className="logout" onClick={handleLogout}><img src={ logout } alt="" /></button>
  )
}

export default Logout