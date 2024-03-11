import React, { useEffect, useState } from 'react'
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import classes from "./Home.module.css"
import Createmail from '../mails/Createmail';
import Inbox from '../mails/Inbox';
import Sent from '../mails/Sent';


const Home = () => {
    const [userData, setUserData] = useState(null);
    const [activeComponent, setActiveComponent] = useState('inbox');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const renderComponent = ()=>{
        switch(activeComponent){
            case 'create':
                return <Createmail/>
            case 'inbox':
                return <Inbox/>
            case 'sent':
                return <Sent/>
            default:
                return null;
        }
    }
    useEffect(()=>{
        fetchUserData()
    },[])

    const fetchUserData = async () => {
        try {
            const response = await fetch("http://localhost:5000/userdata", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    
                },
                body:JSON.stringify({
                    token:window.localStorage.getItem("token")
                })
            });

            if (!response.ok) {
                throw new Error("Fetching user data failed");
            }

            const userData = await response.json();
            setUserData(userData);
            console.log("userdata",userData)
        } catch (error) {
            console.error('Error fetching user data', error);
            setErrorMessage('Error fetching user data. Please try again later.');
        }
    };

    const handleLogout =()=>{
        window.localStorage.clear();
        window.location.href="./login"
    }

  return (
    <div>
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#"><h2>Welcome to the Home Page</h2></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className={classes.navbar}>
          <Nav className="flex-column" style={{ marginRight: '20px' }}>
            <Nav.Item>
              <Nav.Link disabled>{userData?.data?.email.split('@')[0]}</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link disabled>{userData?.data?.email}</Nav.Link>
            </Nav.Item>
          </Nav>
          <Nav className="ml-auto">
              <Nav.Item>
                <Button variant="danger" onClick={handleLogout} >Logout</Button>
              </Nav.Item>
        </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <Container className="mt-3">
        <Nav className='justify-content-start flex-column'>
          <Nav.Item onClick={() => setActiveComponent('create')}>
            <Nav.Link>Create Email</Nav.Link>
          </Nav.Item>
          <Nav.Item onClick={() => setActiveComponent('inbox')}>
            <Nav.Link>Inbox</Nav.Link>
          </Nav.Item>
          <Nav.Item onClick={() => setActiveComponent('sent')}>
            <Nav.Link>Sent</Nav.Link>
          </Nav.Item>
        </Nav>
      </Container>
    <Container className="mt-3 d-flex justify-content-center">
    {renderComponent()}
    </Container>
  </div>
  )
}

export default Home