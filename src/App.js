import React from 'react';
import './App.css';
import FirebaseProvider from './config/FirebaseContext';
import Auth from './components/Auth/Auth';
import UserProvider from './config/UserProvider';
import Navbar from './components/Navbar/Navbar';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import SignIn from './components/SignIn/SignIn';
import CarRegister from './components/CarRegister/CarRegister';
import HomePage from './components/HomePage/Homepage';
// import SvgComponent from './SvgComponent'
function App() {
  return (
    // <SvgComponent/>
    <FirebaseProvider>
      <UserProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
          <Route path="/" element={<div><HomePage /></div>} />
            <Route path="/register" element={<CarRegister/>}></Route>
            <Route path="/signIn" element={<SignIn />}></Route>
            <Route path="/signUp" element={<Auth />}></Route>
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </FirebaseProvider>


  );  
}

export default App;
