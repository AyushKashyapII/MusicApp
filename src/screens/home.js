import React, { useState,useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Library from './library';     
import Feed from './feed';           
import Favourites from './favourites'; 
import Trending from './trending';
import Player from './player';
import Sidebar from "../components/Sidebar";
import Login from './auth/login.js';
import { setClientToken } from '../spotify.js';
// import "./home.css"
const Home = () => {
const [token,setToken]=React.useState("")

React.useEffect(()=> {
  const token=window.localStorage.getItem("token")
  const hash=window.location.hash;
  window.location.hash=""
  if(!token && hash){
    const _token=hash.split("&")[0].split("=")[1]
    window.localStorage.setItem("token",_token);
    setToken(_token)
    setClientToken(_token)
  }
  else{
    setToken(token)
    setClientToken(token)
  }
  
},[])

  return ((!token ?
<Login />  :
 
  
    <Router>
      <div className='main-body' style={{
        height: '100vh',
        width: '100vw',
        backgroundColor: 'bisque',
        display:"flex"
      }}>
        
        <Sidebar />
        <Routes>
        <Route path="/" element={<Library />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/favourites" element={<Favourites />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/player" element={<Player />} />
        <Route path="/library" element={<Library />} />
        <Route path="/callback" component={<Player />} />
      </Routes>
    </div>
    </Router>
  )
  );
}

export default Home;
