import React, { useRef, useState } from 'react'
import {Form, Button, Container, Row, Col} from 'react-bootstrap'
import { Link } from 'react-router-dom';
import classes from './SignUp.module.css'



const Singup = () => {
    
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignUp = async (event) => {
    event.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;

    if (password !== confirmPassword) {
      setErrorMessage("Passwords don't match");
      return;
    }
    try{
        const response = await fetch("http://localhost:5000/register",{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                email,
                password,
                confirmPassword
            })
        })
        if(!response.ok){
            throw new Error("SignUp request failed");
        }
        const data = await response.json();
        if(data.status === "ok"){
            console.log("Signup successfull");
        }else{
            console.log('SignUp failed')
        }
    }catch(error){
        console.error('Error during signup', error);
    }
    
  };

    
  return (
    <div className={classes.container}>
     <Container>
      <Row >
        <Col>
          <h2 className={classes.heading}>SignUp</h2>
          <Form onSubmit={handleSignUp}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                ref={emailRef}
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                ref={passwordRef}
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicConfirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                ref={confirmPasswordRef}
                required
              />
            </Form.Group>

            {errorMessage && <p className="text-danger">{errorMessage}</p>}
            <div className={classes.Btn}>
            <Button variant="primary" type="submit" >
              Sign Up
            </Button>
            </div>
          </Form>
          <p className={classes.tologin}>
            Have an account?  <Link to="/login">Login</Link>
          </p>
        </Col>
      </Row>
    </Container>
   </div>
  )
}

export default Singup