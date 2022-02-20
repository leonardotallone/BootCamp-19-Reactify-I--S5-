const express = require("express");

const auth = require("./auth");
const playlist = require("./playlist");
const artists = require("./artists");
const albums = require("./albums");
const tracks = require("./tracks");
const { checkAuth } = require("../middlewares/auth");

const router = express.Router();

router.use("/", auth);
router.use("/playlists", checkAuth, playlist);
router.use("/artists", checkAuth, artists);
router.use("/albums", checkAuth, albums);
router.use("/tracks", checkAuth, tracks);

module.exports = router;
