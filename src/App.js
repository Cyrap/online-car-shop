import React from 'react';
import './App.css';
import FirebaseProvider from './config/FirebaseContext';
import Auth from './components/Auth/Auth';
import UserProvider from './config/UserProvider';
import Navbar from './components/Navbar/Navbar';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import SignIn from './components/SignIn/SignIn';
import CarRegister from './components/CarRegister/CarRegister';
function App() {
  return (
    <FirebaseProvider>
      <UserProvider>
        <BrowserRouter>
          <Navbar />
          <CarRegister/>
          <Routes>
            <Route path="/" element={<Auth />}></Route>
            <Route path="/signIn" element={<SignIn />}></Route>
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </FirebaseProvider>
  );  
}

export default App;
