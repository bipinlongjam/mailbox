import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import classes from "./MessageDetails.module.css"

const MessageDetails = ({message, onClose}) => {

    const [replyOpen, setReplyOpen] = useState(false);
    const messages = useSelector(state => state.inbox.messages.find(msg => msg._id === message));
    console.log("message",messages)

    if(!messages){
      return <div>No message Found</div>
    }

    const toggleReply = () => {
      setReplyOpen(!replyOpen);
    };
  return (
    <div className={classes.container}>
    <h2>Your message</h2>
    <p>From: {messages.to}</p>
    <p>Subject: {messages.subject}</p>
    <p>Content: {messages.content}</p>
    <p>Received At: {new Date(messages.sentAt).toLocaleString()}</p>
    <div className={classes.button}>
    <button onClick={onClose}>Back to Inbox</button>
    <button onClick={toggleReply}>Reply</button>
    </div>
      {replyOpen && (
        <div>
          <textarea rows="4" cols="50" placeholder="Write your reply here..." />
          <br></br>
          <button>Send</button>
        </div>
      )}
  </div>
  )
}

export default MessageDetails