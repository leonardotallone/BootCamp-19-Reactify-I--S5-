const axios = require("axios");

const spotifyAPI = "https://api.spotify.com/v1";

class AlbumsService {
  static async getAll(authorization) {
    try {
      const resp = await axios.get(`${spotifyAPI}/me/albums`, {
        headers: {
          Authorization: `Bearer ${authorization}`,
        },
      });
      resp.data.items = resp.data.items.map((item) => item.album);
      return {
        error: false,
        data: resp.data,
      };
    } catch ({ response }) {
      const { error } = response.data;
      console.error(error);
      return { error: true, data: error };
    }
  }

  static async getSingle(authorization, id) {
    try {
      const resp = await axios.get(`${spotifyAPI}/albums/${id}`, {
        headers: {
          Authorization: `Bearer ${authorization}`,
        },
      });
      resp.data.tracks = resp.data.tracks.items.map((item) => ({
        ...item,
        album: { name: resp.data.name },
      }));

      return { error: false, data: resp.data };
    } catch ({ response }) {
      const { error } = response.data;
      console.error(error);
      return { error: true, data: error };
    }
  }

  static async saveAlbum(authorization, id) {
    try {
      const resp = await axios({
        method: "PUT",
        url: `${spotifyAPI}/me/albums`,
        data: { ids: [id] },
        headers: {
          Authorization: `Bearer ${authorization}`,
          "Content-Type": "application/json",
        },
      });
      return { error: false, data: resp.data };
    } catch ({ response }) {
      const { error } = response.data;
      console.error(error);
      return { error: true, data: error };
    }
  }
}

module.exports = AlbumsService;
