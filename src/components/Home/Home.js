import React, { useEffect, useState } from 'react'
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import classes from "./Home.module.css"
import Createmail from '../mails/Create/Createmail';
import Inbox from '../mails/Inbox/Inbox';
import Sent from '../mails/Sent/Sent';
import MessageDetails from '../mails/Details/MessageDetails';
import { useSelector } from 'react-redux';
import { useFetchUserData } from './Hooks';


const Home = () => {
  const token = window.localStorage.getItem("token");
  const { userData, errorMessage } = useFetchUserData(token);
  const [activeComponent, setActiveComponent] = useState('inbox');

  const messages = useSelector(state =>state.inbox.messages);
  const unreadMessage = messages.filter(message => !message.isRead).length;
  
    const renderComponent = ()=>{
        switch(activeComponent){
            case 'create':
                return <Createmail/>
            case 'inbox':
                return <Inbox/>
            case 'sent':
                return <Sent/>  
                {/* Sent mail component as resuable*/}
            case 'details':
              return <MessageDetails/>
            default:
              return null;
        }
    }

    const handleLogout =()=>{
        window.localStorage.clear();
        window.location.href="./login"
    }


  return (
    <div className={classes.container}>
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#"><h2>Welcome to the Mail Box</h2></Navbar.Brand>
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
    <div className={classes.containerbody}>
    <div className={classes.componentlink}>
    <Container className="mt-3">
        <Nav className='justify-content-start flex-column'>
          <Nav.Item onClick={() => setActiveComponent('create')}>
            <Nav.Link>Create Email</Nav.Link>
          </Nav.Item>
          <Nav.Item onClick={() => setActiveComponent('inbox')}>
            <Nav.Link>Inbox ({unreadMessage})</Nav.Link>
          </Nav.Item>
          <Nav.Item onClick={() => setActiveComponent('sent')}>
            <Nav.Link>Sent</Nav.Link>
          </Nav.Item>
        </Nav>
      </Container>
      </div>
    <Container className="d-flex justify-content-center">
    {renderComponent()}
    </Container>
    </div>
  </div>
  )
}

export default Home