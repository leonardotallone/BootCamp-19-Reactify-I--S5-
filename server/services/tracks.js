const axios = require("axios");
const qs = require("qs");

const spotifyAPI = "https://api.spotify.com/v1";

class TracksService {
  static async getTrack(authorization, id) {
    try {
      const resp = await axios.get(`${spotifyAPI}/tracks/${id}`, {
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

  static async addTrackToFavs(authorization, id) {
    try {
      const resp = await axios({
        method: "PUT",
        url: `${spotifyAPI}/me/tracks`,
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

  static async removeTrackFromFavs(authorization, id) {
    try {
      const resp = await axios({
        method: "DELETE",
        url: `${spotifyAPI}/me/tracks`,
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

  static async search(authorization, q) {
    const query = qs.stringify({ q, type: "track" });

    try {
      const resp = await axios.get(`${spotifyAPI}/search?${query}`, {
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
}

module.exports = TracksService;
