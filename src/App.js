import React from 'react';
import './App.css';
import FirebaseProvider from './config/FirebaseContext';
import Auth from './components/SignUp/SignUp';
import UserProvider from './config/UserProvider';
import Navbar from './components/Navbar/Navbar';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import SignIn from './components/SignIn/SignIn';
import CarRegister from './components/CarRegister/CarRegister';
import HomePage from './components/HomePage/Homepage';
import SearchResult from "./components/SearchResult/SearchResult";
import List from './components/List/List';
// import SvgComponent from './SvgComponent'
function App() {
  return (
    <FirebaseProvider>
      <UserProvider>
        <BrowserRouter>
        <List/>
          <Navbar />
          <Routes>
          <Route path="/" element={<div><HomePage /></div>} />
            <Route path="/register" element={<CarRegister/>}></Route>
            <Route path="/signIn" element={<SignIn />}></Route>
            <Route path="/signUp" element={<Auth />}></Route>
            <Route path="/search-results/:model" element={<SearchResult/>} />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </FirebaseProvider>


  );  
}

export default App;
