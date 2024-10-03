import React, { useEffect, useRef, useState } from 'react';
import { MdOutlineSkipPrevious } from "react-icons/md";
import { MdOutlineSkipNext } from "react-icons/md";
import { FaRegCirclePause } from "react-icons/fa6";
import { FaPlay } from "react-icons/fa";

const AudioPlayer = ({ currentTrack, tracks, album, setCurrentIndex }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const imageUrl = album?.images[0]?.url;

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current.play();
      }
    }
  }, [currentTrack]);

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    const currentTime = audioRef.current.currentTime;
    const duration = audioRef.current.duration;
    setProgress((currentTime / duration) * 100);
  };

  const handleProgressClick = (e) => {
    const { clientX } = e;
    const { left, width } = e.currentTarget.getBoundingClientRect();
    const clickX = clientX - left;
    const newTime = (clickX / width) * audioRef.current.duration;
    audioRef.current.currentTime = newTime;
    setProgress((newTime / audioRef.current.duration) * 100);
  };

  const handleNext = () => {
    if (tracks && tracks.length > 0) {
      const nextIndex = (tracks.findIndex(track => track.track.id === currentTrack.id) + 1) % tracks.length; 
      setCurrentIndex(nextIndex); 
    }
  };
  
  const handlePrevious = () => {
    if (tracks && tracks.length > 0) {
      const prevIndex = (tracks.findIndex(track => track.track.id === currentTrack.id) - 1 + tracks.length) % tracks.length; 
      setCurrentIndex(prevIndex); 
    }
  };
  

  return (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
      <div>
        <img
          src={imageUrl}
          alt='Track Image'
          style={{
            opacity: 0.4,
            position: 'relative',
            width: '60%',
            borderRadius: '30px',
            marginTop: '25px',
            left: "23%"
          }}
        />
      </div>
      <div style={{
        padding: '20px',
        background: '#f5f5f5',
        borderRadius: '20px',
        background: "#e59485",
        marginTop: "25px"
      }}>
        {currentTrack && (
          <>
            <audio
              ref={audioRef}
              src={currentTrack.preview_url}
              onTimeUpdate={handleTimeUpdate}
              onEnded={() => setIsPlaying(false)}
            />
            <h3>{currentTrack.name}</h3>
            

          
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' ,display:"flex",justifyContent:"space-around"}}>
            
              <button onClick={handlePrevious} style={{
                borderRadius: '8px',
                background: 'burlywood',
                color: 'black',
                fontSize: '17px',
                width: '80px',
                padding:"5px"
              }}>
                <MdOutlineSkipPrevious />
              </button>
              <button onClick={handlePlayPause} style={{
              borderRadius: '8px',
              width: '38px',
              background: 'burlywood',
              color: 'black',
              fontSize: '17px',
              alignSelf:"flex-end",
              padding:"5px"
            }}>
              {isPlaying ? <FaRegCirclePause /> : <FaPlay />}
            </button>
              <button onClick={handleNext} style={{
                borderRadius: '8px',
                background: 'burlywood',
                color: 'black',
                fontSize: '17px',
                width: '80px',
                padding:"5px"
              }}>
                <MdOutlineSkipNext />
              </button>
            </div>

            <div
              style={{
                height: '10px',
                background: '#ddd',
                borderRadius: '5px',
                cursor: 'pointer',
                marginTop: '10px',
                position: 'relative',
              }}
              onClick={handleProgressClick}
            >
              <div
                style={{
                  height: '100%',
                  width: `${progress}%`,
                  background: '#4caf50',
                  borderRadius: '5px',
                }}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AudioPlayer;
