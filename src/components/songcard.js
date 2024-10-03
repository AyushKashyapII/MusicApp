import React from 'react'
import AlbumImage from './albumimage'
import AlbumInfo from './Sidebar/albuminfo'

export default function Songcard({album}) {
  const imageUrl = album?.images[0]?.url;
  console.log(imageUrl)
  return (
    <div className='song-card-body' style={{
        width:"100%",
        height:"60%",
        borderRadius:"20px",
        borderBottomRightRadius:"0px",
        backgroundColor:"beige"
    }}>
      <AlbumImage url={imageUrl} />
      <AlbumInfo album={album} />
    </div>
  )
}
