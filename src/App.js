import { Fragment } from "react";
import {BrowserRouter as  Router, Routes, Route} from 'react-router-dom'
import SignUp from './components/Auth/SignUp'


function App() {
  return (
    <Fragment>
      <Router>
        <Routes>
        <Route path='/signup' element={<SignUp/>}/>
        </Routes>
      </Router>
    </Fragment>
  );
}

export default App;
