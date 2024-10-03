import React from 'react'

export default function AlbumImage({url}) {
    console.log(url)
  return (
    <div>
      <div className='album-img' style={{
            width:"100%",
            alignItems:"center",
            display:"flex",
            justifyContent:"center",
            position:"relative",
            flexDirection:"column",
            alignItems:"center"
        }}>
        
        <img src={url} alt="album image" style={{
            aspectRatio:"1",
            borderRadius:"25px",
            width:"40%",
            marginTop:"15px"

        }} />  
      </div>
     
    </div>
  )
}
