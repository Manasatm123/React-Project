import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Verify from './components/verify';
import Register from './components/register';
import Login from './components/login';
import Profile from './components/profile';
import AddData from './components/addData';
import Edit from './components/edit'
import Nav from './components/Nav';

import AddPost from './components/addPost';
import ViewUserPost from './components/viewUserPost'
import ViewPost from './components/viewPost';
import { useState } from 'react';


function App() {
  const [user,setUser]=useState("")
  console.log("app"+user);
  
 

  return (
    <>
    <Router>
      {user&& <Nav user={user}/>}
      <Routes>
    <Route path="/" element={<Home setUser={setUser}/>}></Route>

      <Route path="/Verify" element={<Verify/>}></Route>
      <Route path="/Register" element={<Register/>}></Route>
      <Route path="/Login" element={<Login/>}></Route>
      <Route path="/profile" element={<Profile/>}></Route>
      <Route path="/addData" element={<AddData/>}></Route>
      <Route path="/edit" element={<Edit/>}></Route>

      <Route path='/viewUserPost/:id' element={<ViewUserPost/>}></Route>
      <Route path='/addPost' element={<AddPost/>}></Route>
      <Route path='/viewPost/:id' element={<ViewPost/>}></Route>

      

      </Routes>
    </Router>
    </>
  )
}

export default App
