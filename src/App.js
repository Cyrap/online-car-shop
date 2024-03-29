import React from 'react';
import FirebaseProvider from './context/FirebaseContext';
import Auth from './components/SignUp/SignUp';
import UserProvider from './context/UserProvider';
import Navbar from './components/Navbar/Navbar';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import SignIn from './components/SignIn/SignIn';
import CarRegister from './components/CarRegister/CarRegister';
import HomePage from './components/HomePage/Homepage';
import Footer from './components/Footer/Footer';
import SideBar from './components/SideBar/SideBar';
import SearchResult from './components/SearchResult/SearchResult';
import MyPosts from './components/MyPosts/MyPosts';
import Popup from './components/Popup/Popup';
import LikeBtn from './components/LikeBtn/LikeBtn';
// import SvgComponent from './SvgComponent'
function App() {
  return (
    <FirebaseProvider>
      <UserProvider>
        <BrowserRouter>
          <Navbar />
        <SideBar/>
          <Routes>
          <Route path="/" element={<div><HomePage /></div>} />
          <Route path='/searchResult/:model' element={<SearchResult/>}></Route>
          <Route path='/Popup/:id' element={<Popup/>}></Route>
            <Route path="/register" element={<CarRegister/>}></Route>
            <Route path="/signIn" element={<SignIn />}></Route>
            <Route path="/signUp" element={<Auth />}></Route>
            <Route path="/search-results/:model" element={<SearchResult/>} />
            <Route path="/myPosts" element={<MyPosts/>} />
          </Routes>
          <Footer/>
        </BrowserRouter>
      </UserProvider>
    </FirebaseProvider>


  );  
}

export default App;
