
const Sidebar = ({ playlists, handlePlaylistSelect, artists, handleArtistSelect }) => {
  return (
    <aside className="menu column is-one-quarter">
      <p className="menu-label">Playlists</p>
      <ul className="menu-list">
        {playlists.map((playlist, i) => (
          <li key={i}>
            <a onClick={() => handlePlaylistSelect(playlist)}>{playlist.name}</a>
          </li>
        ))}
      </ul>
      <p className="menu-label">Artists</p>
      <ul className="menu-list">
        {artists.map((artist, i) => (
          <li key={i}>
            <a onClick={() => handleArtistSelect(artist)}>{artist.name}</a>
          </li>
        ))}
      </ul>

    </aside>
  );
};
export default Sidebar;
