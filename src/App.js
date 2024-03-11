import { Fragment } from "react";
import {BrowserRouter as  Router, Routes, Route} from 'react-router-dom'
import SignUp from './components/Auth/SignUp/SignUp'
import SignIn from "./components/Auth/SignIn/SignIn";
import Home from "./components/Home/Home";


function App() {
  const isLoggedIn= window.localStorage.getItem("loggedIn");

  return (
    <Fragment>
      <Router>
        <Routes>
        <Route path='/' element={isLoggedIn === 'true'? <Home/> : <SignIn/>} />
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/login' element={<SignIn/>}/>
        </Routes>
      </Router>
    </Fragment>
  );
}

export default App;
