import React from 'react'

export default function Queue({tracks,setCurrentIndex}) {
  if(!tracks){
    return <h2>Loading...</h2>
  }
  return (
    <div className='queue-container' style={{
      width:"100%",
      height:"35%",
      borderRadius:"20px",
      borderTopRightRadius:"0px",
      opacity:"1",
      background:"beige"
    }}>
      <div className='queue' style={{
        display:"flex",
        flexDirection:"column",
        justifyContent:"space-between",
        height:"100%"
      }}>
        <p style={{
          fontSize:"20px",
          fontWeight:"700",
          textAlign:"left",
          margin:"20px"
        }}>Up Next</p>
        <div className='list' style={{
          display:"flex",
          flexDirection:"column",
          height:"80%",
          overflowY:"auto",
          marginLeft:"30px",
          color:"black",
          fontWeight:"bolder",
          fontSize:"10px",
          scrollbarWidth: "thin", 
          scrollbarColor: "#888 #f1f1f1", 

        }}>
          {tracks?.map((track, index) => (
            <div key={index} onClick={() => setCurrentIndex(index)}>
              <p>{track?.track?.name}</p>
            </div>
          ))}
            
            
          
        </div>

      </div>

      
    </div>
  )
}