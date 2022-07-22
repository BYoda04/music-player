const express = require('express');

//controllers
const { create } = require('../controllers/albums');

//validators
const { albumValidator } = require('../validators/albums');

//utils
const { verifyToken, onlyOwner } = require('../utils/tokenVerify');
const { upload } = require('../utils/upload');

//middleware
const { artistsExists } = require('../middlewares/artists');

const albumsRouter = express.Router();

//htttp://localhost:port/api/v1/user GET,POST,DELET,PUT
albumsRouter.post("/albums/:id", verifyToken, artistsExists, onlyOwner, upload.single("img"), albumValidator,create)

module.exports = { albumsRouter };