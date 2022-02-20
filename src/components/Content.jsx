import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../commons/Header";
import TrackListItem from "../commons/TrackListItem";

const Content = ({ playlist, artist, type }) => {
  const [singlePlaylist, setSinglePlaylist] = useState({});
  const [singleArtist, setSingleArtist] = useState({});

  useEffect(() => {
    if (!playlist.id) return;
    axios
      .get(`/api/playlists/${playlist.id}`)
      .then((res) => res.data)
      .then((pl) => setSinglePlaylist(pl));
  }, [playlist]);

  useEffect(() => {
    if (!artist.id) return;
    axios
      .get(`/api/artists/${artist.id}`)
      .then((res) => res.data)
      .then((artist) => setSingleArtist(artist));
  }, [artist]);

  let data = type == "Artist" ? singleArtist : singlePlaylist;

  if (!data.id) return <p>No hay datos</p>;

  return (
    <section className="layout">
      <Header {...data} type={type}/>
      <TrackListItem tracks={data.tracks || []} />
    </section>
  );
};

export default Content;
