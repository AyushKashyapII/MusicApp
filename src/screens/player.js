import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import apiClient from '../spotify'
import Songcard from '../components/songcard'
import { default as Queue } from '../components/queue';
import AudioPlayer from '../components/audioplayer';

const Player = ({ playlist }) => {

  const location = useLocation()
  const [tracks, setTracks] = React.useState("")
  const [currentTrack, setCurrentTrack] = React.useState({})
  const [currentIndex,setCurrentIndex]=React.useState(0)
 
  useEffect(() => {
    if (location.state) {
      apiClient.get("playlists/" + location.state?.id + "/tracks")
        .then(res => {
          setTracks(res.data.items)
          setCurrentTrack(res.data.items[0].track)
        })
    }
  }, [location.state])

  useEffect(() => {
    if (playlist) {
      setCurrentTrack(playlist.tracks[0]);
    }
  }, [playlist]);

  useEffect(() => {
    if (tracks.length > 0 && currentIndex < tracks.length) {
      setCurrentTrack(tracks[currentIndex].track);
    }
  }, [currentIndex, tracks]);

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", justifyContent: "space-around" }}>
      <div className='left-player' style={{
        width: "60%",
        height: "100%",

      }}>
      
          <AudioPlayer currentTrack={currentTrack} tracks={tracks} album={currentTrack.album} setCurrentIndex={setCurrentIndex}/>
       
        

      </div>
      <div className='right-player' style={{
        width: "35%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        overflow:"hidden"

      }}>
        {currentTrack.album && (
          <Songcard album={currentTrack.album} />
        )}


          <Queue tracks={tracks} setCurrentIndex={setCurrentIndex} />

      </div>
    </div>

  )
}

export default Player