import React from 'react';
import './App.css';
import Header from './Header';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './Signup';
import DisplayEmp from './DisplayEmp';
import EditProfile from './EditProfile';
import Login from './Login';
import Protect from './Protect';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/login' element={<Login />}/>
        <Route element={<Protect />} >
            <Route path='/' element={<Signup />} />
            <Route path='/getemployees' element={<DisplayEmp />} />
            <Route path='/editemployee' element={<EditProfile />} />
        </Route> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;
