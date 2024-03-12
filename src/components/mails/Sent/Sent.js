import React, { useState, useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa'; 
import classes from './Sent.module.css'

const Sent = () => {
    const [messages, setMessages] = useState([]);


    useEffect(()=>{
        fetchSentEmails();
    },[])

    // fetch sent emails from mongodb
    const fetchSentEmails = async () => {
        try {
            const response = await fetch("http://localhost:5000/sentemails", {
                method: 'POST', // Assuming you are using GET method to fetch sent emails
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            if (!response.ok) {
                throw new Error("Fetching sent emails failed");
            }
    
            const sentEmails = await response.json();
            console.log("Sent Emails:", sentEmails);
            setMessages(sentEmails)
            // Handle the fetched sentEmails data as needed
        } catch (error) {
            console.error('Error fetching sent emails:', error);
            // Handle the error, e.g., display an error message
        }
    };

    const handleDeleteEmail = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/sentemails/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error("Deleting email failed");
            }
            // Remove the deleted email from the state
            setMessages(messages.filter(message => message._id !== id));
        } catch (error) {
            console.error('Error deleting email:', error);
            // Handle the error, e.g., display an error message
        }
    };
  return (
    <div className={classes.container}>
        <h2>Sent Messages</h2>
      <Table striped bordered hover size="xxl">
        <thead>
          <tr>
            <th>#</th>
            <th>To</th>
            <th>Subject</th>
            <th>Content</th>
            <th>Sent At</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {messages?.map((message, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{message.to}</td>
              <td>{message.subject}</td>
              <td>{message.content}</td>
              <td>{new Date(message.sentAt).toLocaleString()}</td>
              <td>
                <Button variant="danger" onClick={() => handleDeleteEmail(message._id)} data-testid="delete-button">
                    <FaTrash/>
                </Button>
                {/* Delete Button */}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default Sent