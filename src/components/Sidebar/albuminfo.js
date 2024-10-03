import React from 'react'
import "./albuminfo.css"
const AlbumInfo = ({album}) => {
  console.log(album)
  console.log(album.tracks?.total)
  const artists = album.artists.map(artist => artist.name);
  return (
    <div style={{
      display:"flex",
      justifyContent:"space-between",
      flexDirection:"column",
      alignItems:"center"
    }}>
      <div className='albumname-container' style={{
  whiteSpace: "nowrap",
  overflow: "hidden"
}}>
  <marquee behavior="scroll" direction="left">
    <h2>{album.name + " - " + artists.join(",")}</h2>
  </marquee>
</div>
      <div className='album-info' style={{textAlign:"center"}}>
      <h5>{album?.name} is a playlist with {album?.total_tracks} tracks</h5>
      </div>
      <div className='album-release' style={{textAlign:"center"}}>
        <h5>Release Date: {album?.release_date}</h5>
      </div>
    </div>
  )
}

export default AlbumInfo