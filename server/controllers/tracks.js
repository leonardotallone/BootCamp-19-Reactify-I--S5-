const TracksService = require("../services/albums");

class TracksController {
  static async getTrack(req, res) {
    const { id } = req.params;

    const { error, data } = await TracksService.getTrack(req.access_token, id);

    if (error) {
      return res.status(data.status || 500).send({ message: data.message });
    }
    res.send(data);
  }

  static async addTrackToFavs(req, res) {
    const { id } = req.body;

    if (!id)
      return res.status(400).send({ message: "Missing required property id" });

    const { error, data } = await TracksService.addTrackToFavs(
      req.access_token,
      id
    );

    if (error) {
      return res.status(data.status || 500).send({ message: data.message });
    }

    res.send(data);
  }

  static async removeTrackFromFavs(req, res) {
    const { id } = req.body;

    if (!id)
      return res.status(400).send({ message: "Missing required property id" });

    const { error, data } = await TracksService.removeTrackFromFavs(
      req.access_token,
      id
    );

    if (error) {
      return res.status(data.status || 500).send({ message: data.message });
    }

    res.status(204).send(data);
  }

  static async search(req, res) {
    const { query } = req.body;

    const { error, data } = await TracksService.search(req.access_token, query);

    if (error) {
      return res.status(data.status || 500).send({ message: data.message });
    }
    res.send(data);
  }
}

module.exports = TracksController;
