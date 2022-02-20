const axios = require("axios");

const spotifyAPI = "https://api.spotify.com/v1";

class PlaylistService {
  static async getAll(authorization) {
    try {
      const resp = await axios.get(`${spotifyAPI}/me/playlists`, {
        headers: {
          Authorization: `Bearer ${authorization}`,
        },
      });
      return { error: false, data: resp.data };
    } catch ({ response }) {
      const { error } = response.data;
      console.error(error);
      return { error: true, data: error };
    }
  }

  static async getSingle(authorization, id) {
    try {
      const resp = await axios.get(`${spotifyAPI}/playlists/${id}`, {
        headers: {
          Authorization: `Bearer ${authorization}`,
        },
      });
      resp.data.tracks = resp.data.tracks.items.map((item) => item.track);
      return { error: false, data: resp.data };
    } catch ({ response }) {
      const { error } = response.data;
      console.error(error);
      return { error: true, data: error };
    }
  }

  static async createPublicPlaylist(authorization, info) {
    const { user_id, ...data } = info;

    try {
      const resp = await axios.post(
        `${spotifyAPI}/users/${user_id}/playlists`,
        data,
        {
          headers: {
            Authorization: `Bearer ${authorization}`,
          },
        }
      );
      return { error: false, data: resp.data };
    } catch ({ response }) {
      const { error } = response.data;
      console.error(error);
      return { error: true, data: error };
    }
  }

  static async addTrackToPlaylist(authorization, { playlist_id, track_uri }) {
    try {
      const resp = await axios.post(
        `${spotifyAPI}/playlists/${playlist_id}/tracks`,
        { uris: [track_uri] },
        {
          headers: {
            Authorization: `Bearer ${authorization}`,
            "Content-Type": "application/json",
          },
        }
      );
      return { error: false, data: resp.data };
    } catch ({ response }) {
      const { error } = response.data;
      console.error(error);
      return { error: true, data: error };
    }
  }

  static async removeTrackFromPlaylist(
    authorization,
    { playlist_id, track_uri }
  ) {
    try {
      const resp = await axios({
        method: "DELETE",
        url: `${spotifyAPI}/playlists/${playlist_id}/tracks`,
        headers: {
          Authorization: `Bearer ${authorization}`,
          "Content-Type": "application/json",
        },
        data: { tracks: [{ uri: track_uri }] },
      });
      return { error: false, data: resp.data };
    } catch ({ response }) {
      const { error } = response.data;
      console.error(error);
      return { error: true, data: error };
    }
  }

  static async updatePlaylist(authorization, data) {
    const { playlist_id, ...info } = data;
    try {
      const resp = await axios.put(
        `${spotifyAPI}/playlists/${playlist_id}`,
        info,
        {
          headers: {
            Authorization: `Bearer ${authorization}`,
            "Content-Type": "application/json",
          },
        }
      );
      return { error: false, data: resp.data };
    } catch ({ response }) {
      const { error } = response.data;
      console.error(error);
      return { error: true, data: error };
    }
  }
}

module.exports = PlaylistService;
