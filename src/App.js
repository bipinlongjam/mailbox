import { Fragment } from "react";
import {BrowserRouter as  Router, Routes, Route} from 'react-router-dom'
import SignUp from './components/Auth/SignUp'
import SignIn from "./components/Auth/SignIn";
import Home from "./components/Home/Home";


function App() {
  return (
    <Fragment>
      <Router>
        <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/login' element={<SignIn/>}/>
        </Routes>
      </Router>
    </Fragment>
  );
}

export default App;
