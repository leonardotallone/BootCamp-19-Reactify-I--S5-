/**
 * It defines which information can be accessed by the server in users behalf
 */

module.exports = [
  "user-read-email", // email info
  "user-read-private", // user private info (not sensitive data)
  "playlist-read-private", // fetch private playlists
  "playlist-modify-public", // create public playlists
  "playlist-modify-private", // delete tracks from playlist
  "user-follow-read", // fetch what user follows
  "user-library-read"
];
