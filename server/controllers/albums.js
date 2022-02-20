const AlbumsService = require("../services/albums");

class AlbumsController {
  static async getAll(req, res) {
    const { error, data } = await AlbumsService.getAll(req.access_token);

    if (error) {
      return res.status(data.status || 500).send({ message: data.message });
    }
    res.send(data);
  }

  static async getSingle(req, res) {
    const { id } = req.params;

    const { error, data } = await AlbumsService.getSingle(req.access_token, id);

    if (error) {
      return res.status(data.status || 500).send({ message: data.message });
    }
    res.send(data);
  }

  static async saveAlbum(req, res) {
    const { id } = req.body;

    if (!id)
      return res.status(400).send({ message: "Missing required property id" });

    const { error, data } = await AlbumsService.saveAlbum(req.access_token, id);

    if (error) {
      return res.status(data.status || 500).send({ message: data.message });
    }

    res.status(201).send(data);
  }
}

module.exports = AlbumsController;
