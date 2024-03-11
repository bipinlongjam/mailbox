import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import classes from './Createmails.module.css'


const Createmail = () => {

  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const onEditorStateChange = (newEditorState) => {
    setEditorState(newEditorState);
  };

  const sendEmail = () => {
    const emailData = {
      to: to,
      subject: subject,
      content: editorState.getCurrentContent().getPlainText(),
    };

    fetch('http://localhost:5000/sendmail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailData),
    })
      .then(response => {
        if (response.ok) {
          console.log('Email sent successfully');
          // Optionally, you can reset the form fields here
          setTo('');
          setSubject('');
          setEditorState(EditorState.createEmpty());
        } else {
          console.error('Failed to send email:', response.statusText);
          // Handle error
        }
      })
      .catch(error => {
        console.error('Error occurred while sending email:', error);
        // Handle error
      });
  };
  return (
    <div className={classes.container}>
      <h3>Compose Email</h3>
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>To</Form.Label>
          <Form.Control 
            type="email" 
            placeholder="Enter email" 
            value={to} 
            onChange={(e) => setTo(e.target.value)} 
          />
        </Form.Group>

        <Form.Group controlId="formBasicSubject">
          <Form.Label>Subject</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Enter subject" 
            value={subject} 
            onChange={(e) => setSubject(e.target.value)} 
          />
        </Form.Group>

        <Form.Group controlId="formBasicEditor">
          <Form.Label>Content</Form.Label>
          <div className={classes.editor}>
          <Editor
            editorState={editorState}
            onEditorStateChange={onEditorStateChange}
            data-testid="email-editor"
            wrapperClassName="demo-wrapper"
            editorClassName="demo-editor"
            placeholder="Write your email content here..."
          />
        </div>
        </Form.Group>
        <div className={classes.sentBtn}>
        <Button variant="primary" onClick={sendEmail} >
          Send Email
        </Button>
        </div>
      </Form>
    </div>
  )
}

export default Createmail