import React, { useState, useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';
import { FaTrash, FaCircle } from 'react-icons/fa'; 
import { UseDispatch, useDispatch, useSelector } from 'react-redux';
import classes from './Inbox.module.css'
import { fetchMessages, deleteMessage, markMessageAsRead } from '../../../reducer/inboxSlice';
import MessageDetails from '../Details/MessageDetails';


const Inbox = () => {
  const dispatch = useDispatch();
  const { messages, loading, error } = useSelector(state => state.inbox);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [messageDetailsOpen, setMessageDetailsOpen] = useState(false);
 

  useEffect(()=>{
    dispatch(fetchMessages());
  },[dispatch])

  const handleDeleteEmail = (id) => {
    dispatch(deleteMessage(id));
  };
  const handleRowClick = (id) => {
    setSelectedMessage(id);
    setMessageDetailsOpen(true);
    dispatch(markMessageAsRead(id));
    console.log("message",selectedMessage)
    console.log("selectedId", id)
  };
  const closeMessageDetails = () => {
    setSelectedMessage(null);
    setMessageDetailsOpen(false); // Close message details
  };

  return (
    <div className={classes.container}>
        <h2>Inbox Messages</h2>
        {!messageDetailsOpen && (
      <Table striped bordered hover size="xxl">
        <thead>
          <tr>
            <th>#</th>
            <th>From</th>
            <th>Subject</th>
            <th>Content</th>
            <th>Received At</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {messages?.map((message, index) => (
            <tr key={index} onClick={() => handleRowClick(message._id)}>
              <td>{index + 1}</td>
              <td>
              {!message.isRead && <FaCircle className={classes.unreadIcon} />}
                {message.to}</td>
              <td>{message.subject}</td>
              <td>{message.content}</td>
              <td>{new Date(message.sentAt).toLocaleString()}</td>
              <td>
                <Button variant="danger" onClick={() => handleDeleteEmail(message._id)} data-testid="delete-button">
                    <FaTrash/>
                </Button> 
                {/* //Delete button */}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
       )}
      {selectedMessage && <MessageDetails message={selectedMessage} onClose={closeMessageDetails}/>}
    </div>
  )
}

export default Inbox