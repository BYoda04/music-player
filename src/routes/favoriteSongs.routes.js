const express = require('express');

//controllers
const { create } = require('../controllers/favoriteSongs');

//middlewares
const { songExists } = require('../middlewares/songs');

//utils
const { verifyToken } = require('../utils/tokenVerify');

const favoriteSongsRouter = express.Router();

// htttp://localhost:port/api/v1/songs GET,POST,DELET,PUT
favoriteSongsRouter.post("/favorite/:id", verifyToken, songExists,create);

module.exports = { favoriteSongsRouter };