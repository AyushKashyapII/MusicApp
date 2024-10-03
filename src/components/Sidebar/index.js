import React, { useEffect, useState } from 'react';
import SidebarButton from './sidebarButton';
import { MdFavorite } from 'react-icons/md';
import { FaPlay, FaSignOutAlt } from 'react-icons/fa';
import { IoLibrary } from 'react-icons/io5';
import { IoIosTrendingUp } from 'react-icons/io';
import { MdSpaceDashboard } from 'react-icons/md';
import apiClient, { setClientToken } from '../../spotify'; 
import { loginEndpoint } from '../../spotify';
export default function Sidebar() {
  const [image, setImage] = useState('gojo.jpg');
  const accessToken = localStorage.getItem('token'); 
  console.log(accessToken)

  useEffect(() => {
   
    if (!accessToken) {
      window.location.href = loginEndpoint; 
    } else {
      setClientToken(accessToken); 
      apiClient.get('me')
        .then((response) => {
          if(response.data.images && response.data.images.length >0){
            setImage(response.data.images[0].url)
          }else{
            setImage("gojo.img")
          }
        }).catch((error) => {
          console.error("Error fetching user data:", error);
          if (error.response && error.response.status === 401) {
              localStorage.removeItem('token'); 
              window.location.href = loginEndpoint; 
          }
      });
    }
  }, [accessToken]);

  return (
    <div className='sidebar-container' style={{
      width: "220px",
      height: "100vh",
      display: "flex",
      background: "#a16a6a",
      alignItems: "center",
      flexDirection: "column",
      justifyContent: "space-between"
    }}>
      <img src={image} className='profile-img' alt='Gojo Satarou'
        style={{
          width: "60px",
          height: "60px",
          borderRadius: "30px",
          marginTop: "25px"
        }} />
      <div>
        <SidebarButton title="Feed" to="/feed" icon={<MdSpaceDashboard />} />
        <SidebarButton title="Trending" to="/trending" icon={<IoIosTrendingUp />} />
        <SidebarButton title="Player" to="/player" icon={<FaPlay />} />
        <SidebarButton title="Favourites" to="/favourites" icon={<MdFavorite />} />
        <SidebarButton title="Library" to="/library" icon={<IoLibrary />} />
      </div>
      <SidebarButton title="Sign Out" to="" icon={<FaSignOutAlt />} />
    </div>
  );
}
