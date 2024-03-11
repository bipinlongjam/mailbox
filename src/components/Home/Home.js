import React, { useState } from 'react'
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import classes from "./Home.module.css"
import Createmail from '../mails/Createmail';
import Inbox from '../mails/Inbox';
import Sent from '../mails/Sent';


const Home = () => {
    const [activeComponent, setActiveComponent] = useState('inbox');

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
    
  return (
    <div>
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#"><h2>Welcome to the Home Page</h2></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className={classes.navbar}>
          <Nav className="flex-column" style={{ marginRight: '20px' }}>
            <Nav.Item>
              <Nav.Link disabled>Username</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link disabled>User Email</Nav.Link>
            </Nav.Item>
          </Nav>
          <Nav className="ml-auto">
              <Nav.Item>
                <Button variant="danger">Logout</Button>
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