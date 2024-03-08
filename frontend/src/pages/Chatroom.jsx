import React, { useEffect, useState } from 'react'
import Logout from '../components/Logout'
import ChatBox from '../components/ChatBox'
import '../styles/Chatroom.css'

const Chat = () => {
    const [visibility, setVisibility] = useState(false)
    const [conversations, setConversations] = useState([])
    const [selectedConversation, setSelectedConversation] = useState(null)
    // Function to handle the display of conversations
    useEffect(() => {
        // Code to fetch all conversations
        const getConversations = async () => {
            try{
                console.log(localStorage.getItem('token'))
                const res = await fetch('https://chat-app-api-id8w.onrender.com/api/users', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    token: localStorage.getItem('token')
                },
                credentials: 'include'
            })
                const data = await res.json()
                setConversations(data)
            }
            catch(err){
                console.log("Error in getting user details")
                console.log(err)
            }
        };
        getConversations();
    }, [])

    const handleChat = (conversation) => {
        setSelectedConversation(conversation);
        setVisibility(true);
    }
  return (
        <div className="chatContainer">
            <div className="list">
                <div className="users" >
                {conversations.map(conversation => (
                        <div className="user" key={conversation._id} onClick={() => handleChat(conversation)}>
                            <img className='userImg' src={conversation.profileImg} alt="profile" />
                            <h1 className="username">{conversation.username}</h1>
                        </div>
                    ))}
                </div>
                <Logout/>
            </div>
            <ChatBox 
                selectedConversation={selectedConversation}
                visibility={visibility}
                setVisibility={setVisibility}
                 />
        </div>
  )
}

export default Chat