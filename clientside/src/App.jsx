import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Verify from './components/verify';
import Register from './components/register';
import Login from './components/login';
import Nav from './components/nav';


function App() {
 

  return (
    <>
    <Router>
      <Nav/>
      <Routes>
    <Route path="/" element={<Home/>}></Route>

      <Route path="/Verify" element={<Verify/>}></Route>
      <Route path="/Register" element={<Register/>}></Route>
      <Route path="/Login" element={<Login/>}></Route>
      

      </Routes>
    </Router>
    </>
  )
}

export default App
