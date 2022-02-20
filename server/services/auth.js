const axios = require("axios");

const spotifyAPI = "https://api.spotify.com/v1";

class AuthService {
  static async generateToken({ params, client_id, client_secret }) {
    const tokenParams = new URLSearchParams({
      ...params,
      grant_type: "authorization_code",
    });

    const authorization = Buffer.from(`${client_id}:${client_secret}`).toString(
      "base64"
    );

    try {
      const resp = await axios.post(
        "https://accounts.spotify.com/api/token",
        tokenParams,
        {
          headers: {
            Authorization: `Basic ${authorization}`,
            "Content-Type": "application/x-www-form-urlencoded",
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

  static async me(authorization) {
    try {
      const resp = await axios.get(`${spotifyAPI}/me`, {
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

module.exports = AuthService;
