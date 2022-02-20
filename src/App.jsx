import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

import "./App.css";
import { fakePlaylists } from "./utils/fakeData";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Content from "./components/Content";

const App = () => {
  const [selectedPlaylist, setSelectedPlaylist] = useState({});
  const [playlists, setPlaylists] = useState([]);
  const [artists, setArtists] = useState([]);
  const [selectedArtist, setSelectedArtist] = useState([]);
  const [type, setType] = useState("");

  useEffect(() => {
    axios
      .get("/api/playlists")
      .then((res) => res.data)
      .then((playlists) => setPlaylists(playlists.items));
    axios
    .get ("/api/artists")
    .then ((res)=> res.data)
    .then ((artists)=>setArtists(artists.items))    
  }, []);

  const handlePlaylistSelect = (pl) => {
    setSelectedPlaylist(pl);
    setType("Playlist");
  };

  const handleArtistSelect = (artist)=>{
      setSelectedArtist(artist)
      setType("Artist");
  }

  return (
    <div>
      <Navbar />
      <div className="container is-fluid columns">
        <Sidebar 
        playlists={playlists} 
        artists={artists}
        handlePlaylistSelect={handlePlaylistSelect}
        handleArtistSelect={handleArtistSelect} 
        />
        <Content
        playlist={selectedPlaylist}
        artist={selectedArtist}
        type={type}
        />
      </div>
    </div>
  );
};

export default App;
