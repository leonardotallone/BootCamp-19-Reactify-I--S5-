const express = require("express");

const AlbumsController = require("../controllers/albums");

const router = express.Router();

router.get("/", AlbumsController.getAll);
router.get("/:id", AlbumsController.getSingle);
router.put("/", AlbumsController.saveAlbum);

module.exports = router;
