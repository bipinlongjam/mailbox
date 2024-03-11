import React, { useRef, useState } from 'react'
import {Form, Button, Container, Row, Col} from 'react-bootstrap'
import classes from './SignIn.module.css'
import { Link, useNavigate } from 'react-router-dom';


const SignIn = () => {

    const emailRef = useRef();
    const passwordRef = useRef();
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate()
    
    const handleSignIn = async (event)=>{
        event.preventDefault()
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        try{
            const response = await fetch("http://localhost:5000/login",{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    email,
                    password
                    
                })
            })
            if(!response.ok){
                throw new Error("SignIn failed");
            }
            const data = await response.json();
            if(data.status === "ok"){
                console.log("Login successfully");
                console.log("userdata",data)
                console.log("userToken", data.token)
                navigate('/');
            }else{
                console.log('Sign In not success ')
            }
        }catch(error){
            console.error('Error during signin', error);
        }
        
    }

    
  return (
   
    <div className={classes.container}>
    <Container>
     <Row >
       <Col>
         <h2 className={classes.heading}>Sign In</h2>
         <Form onSubmit={handleSignIn}>
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

           {errorMessage && <p className="text-danger">{errorMessage}</p>}
           <div className={classes.Btn}>
           <Button variant="primary" type="submit" >
             Sign In
           </Button>
           </div>
         </Form>
         <p className={classes.tologin}>
           Don't Have an account?  <Link to="/signup">SignUp</Link>
         </p>
       </Col>
     </Row>
   </Container>
  </div>
  )
}

export default SignIn