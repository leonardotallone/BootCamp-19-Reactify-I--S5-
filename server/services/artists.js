const axios = require("axios");

const spotifyAPI = "https://api.spotify.com/v1";

class ArtistsService {
  static async getAll(authorization, options) {
    const params = new URLSearchParams({
      type: "artist",
      ...options,
    });

    try {
      const resp = await axios.get(`${spotifyAPI}/me/following`, {
        headers: {
          Authorization: `Bearer ${authorization}`,
        },
        params,
      });
      return { error: false, data: resp.data.artists };
    } catch ({ response }) {
      const { error } = response.data;
      console.error(error);
      return { error: true, data: error };
    }
  }

  static async getSingle(authorization, id, options) {
    if (!options.market) options.market = "AR";

    const params = new URLSearchParams(options);
    try {
      const artist = await axios.get(`${spotifyAPI}/artists/${id}`, {
        headers: {
          Authorization: `Bearer ${authorization}`,
        },
      });

      const tracks = await axios.get(`${spotifyAPI}/artists/${id}/top-tracks`, {
        headers: {
          Authorization: `Bearer ${authorization}`,
        },
        params,
      });

      return {
        error: false,
        data: { ...artist.data, tracks: tracks.data.tracks },
      };
    } catch ({ response }) {
      const { error } = response.data;
      console.error(error);
      return { error: true, data: error };
    }
  }

  static async followArtist(authorization, id) {
    const params = new URLSearchParams({ type: "artist", ids: id });
    try {
      const resp = await axios.put(`${spotifyAPI}/me/following`, {
        headers: {
          Authorization: `Bearer ${authorization}`,
          "Content-Type": "application/json",
        },
        params,
      });
      return { error: false, data: resp.data };
    } catch ({ response }) {
      const { error } = response.data;
      console.error(error);
      return { error: true, data: error };
    }
  }
}

module.exports = ArtistsService;
