import React, { useEffect, useState } from 'react';
import apiClient from '../spotify';
import { IconContext } from 'react-icons';
import { AiFillPlayCircle } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

const Library = () => {
  const [playlists, setPlayLists] = useState(null);

  useEffect(() => {
    const fetchPlaylists = async () => {
      const playlistsResponse = await apiClient.get("me/playlists");
      const playlistsData = playlistsResponse.data.items;

      const playlistsWithTracks = await Promise.all(playlistsData.map(async (playlist) => {
        const tracksResponse = await apiClient.get(`playlists/${playlist.id}/tracks`, {
          params: {
            limit: 50, // fetch 50 tracks at a time
          },
        });

        let tracks = tracksResponse.data.items;
        let nextPage = tracksResponse.data.next;

        while (nextPage) {
          const nextPageResponse = await apiClient.get(nextPage);
          tracks = tracks.concat(nextPageResponse.data.items);
          nextPage = nextPageResponse.data.next;
        }

        return {
          ...playlist,
          tracks,
        };
      }));

      setPlayLists(playlistsWithTracks);
    };

    fetchPlaylists();
  }, []);

  const navigate = useNavigate();

  const playPlayList = (playlist) => {
    navigate("/player", { state: { id: playlist } });
  };

  return (
    <div className='screen-container' style={{ background: "transparent" }}>
      <div className='library-body' style={{
        width: "94%",
        height: "90%",
        padding: "3%",
        display: "flex",
        flexWrap: "wrap",
        overflowY: "auto",
        cursor: "pointer"
      }}>
        {playlists ? (
          playlists.map((playlist) => (
            <div
              key={playlist.id}
              style={{
                width: "22%",
                height: "40%",
                borderRadius: "14px",
                backgroundColor: "rgb(203 235 235)",
                margin: "5%",
                boxShadow: "1px 4px 3px 3px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                transition: "transform 0.4s ease-in-out", // Smooth transition
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
              }}

              onClick={() => playPlayList(playlist.id)}
            >
              <p style={{ fontFamily: "Arial", fontWeight: "bolder" }}>{playlist.name}</p>
              <img src={playlist.images[0].url} alt="playlist image" style={{
                width: "75%",
                height: "140px",
                borderRadius: "15px",
                aspectRatio: "1"
              }} />
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <p style={{ fontWeight: "bolder" }}>{playlist.tracks.length} songs</p>
                <div style={{ marginLeft: "50px" }}><IconContext.Provider value={{ size: "50px" }}>
                  <AiFillPlayCircle /></IconContext.Provider></div>
              </div>
            </div>
          ))
        ) : (
          <h1>Loading playlists...</h1>
        )}
      </div>
    </div>
  );
}

export default Library;