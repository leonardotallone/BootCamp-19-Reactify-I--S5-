const PlaylistService = require("../services/playlists");
const AuthService = require("../services/auth");

class PlaylistController {
  static async getAll(req, res) {
    const { error, data } = await PlaylistService.getAll(req.access_token);

    if (error) {
      return res.status(data.status || 500).send({ message: data.message });
    }

    res.send(data);
  }

  static async getSingle(req, res) {
    const { id } = req.params;

    const { error, data } = await PlaylistService.getSingle(
      req.access_token,
      id
    );

    if (error) {
      return res.status(data.status || 500).send({ message: data.message });
    }

    res.send(data);
  }

  static async createPublicPlaylist(req, res) {
    const { name, description } = req.body;

    if (!name)
      return res
        .status(400)
        .send({ message: "Missing required property name" });

    const me = await AuthService.me(req.access_token);

    if (me.error) {
      return res
        .status(me.data.status || 403)
        .send({ message: me.data.message });
    }

    const { error, data } = await PlaylistService.createPublicPlaylist(
      req.access_token,
      {
        name,
        description,
        user_id: me.data.id,
      }
    );

    if (error) {
      return res.status(data.status || 500).send({ message: data.message });
    }

    res.status(201).send(data);
  }

  static async addTrackToPlaylist(req, res) {
    const { uri } = req.body;
    const playlist_id = req.params.id;

    if (!uri)
      return res.status(400).send({ message: "Missing required property uri" });

    const { error, data } = await PlaylistService.addTrackToPlaylist(
      req.access_token,
      { playlist_id, track_uri: uri }
    );

    if (error) {
      return res.status(data.status || 500).send({ message: data.message });
    }

    res.status(201).send(data);
  }

  static async removeTrackFromPlaylist(req, res) {
    const { id, uri } = req.params;

    const { error, data } = await PlaylistService.removeTrackFromPlaylist(
      req.access_token,
      {
        playlist_id: id,
        track_uri: uri,
      }
    );

    if (error) {
      return res.status(data.status || 500).send({ message: data.message });
    }

    res.status(204).send(data);
  }

  static async updatePlaylist(req, res) {
    const playlist_id = req.params.id;
    const { name, description } = req.body;

    if (!name && !description)
      return res.status(400).send("Missing properties to edit");

    const { error, data } = await PlaylistService.updatePlaylist(
      req.access_token,
      {
        playlist_id,
        name,
        description,
      }
    );

    if (error) {
      return res.status(data.status || 500).send({ message: data.message });
    }

    res.status(204).send(data);
  }
}

module.exports = PlaylistController;
