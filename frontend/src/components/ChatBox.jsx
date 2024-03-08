import React, { useEffect, useState } from 'react'
import close from '../img/close.png'

const ChatBox = ({selectedConversation, visibility, setVisibility}) => {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  //get messages
  useEffect(() => {
    if(selectedConversation !== null){
      const getMessages = async () => {
        try{
          const res = await fetch(`https://chat-app-api-id8w.onrender.com/api/messages/${selectedConversation._id}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('token')}`,
              token: localStorage.getItem('token')
            },
            credentials: 'include'
          })
          const data = await res.json()
          setMessages(data)
          console.log(data)
        }
        catch(err){
          console.log(err)
        }}
      getMessages();
    }}, [selectedConversation])


  //send message
  const handleMessage = async (message) => {
    try{
      const res = await fetch(`https://chat-app-api-id8w.onrender.com/api/messages/send/${selectedConversation._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          token: localStorage.getItem('token')
        },
        credentials: 'include',
        body: JSON.stringify({ message })
      })
      const data = await res.json()
      setMessage('');
      setMessages([...messages, data])
      document.getElementById("chatbox").scrollTo(0, document.getElementById("chatbox").scrollHeight);
    }
    catch(err){
      console.log(err)
    }
  }
  return (
    <div className="chatBoxContainer" style={{ visibility: visibility ? 'visible' : 'hidden' }}>
      <div className="chatBoxHeader">
        {selectedConversation !== null && <h1>Chat with: {selectedConversation.username}</h1>}
        <button onClick={() => setVisibility(false)}><img src={ close } alt='X'/></button>
      </div>
      <div className="chatMessages" id="chatbox">
        {messages.map(message => (
          <p className={message.senderID === localStorage.getItem('id') ? 'sender' : 'receiver'} key={message._id}>{message.message}</p>
        ))}
      </div>
      <div className="sendMessage">
        <input type="text" value={message} onChange={(e) => setMessage(e.target.value)}/>
        <button onClick={() => handleMessage(message)}>send</button>
      </div>
    </div>
  )
}

export default ChatBox