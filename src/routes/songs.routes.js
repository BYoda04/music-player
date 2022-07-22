const express = require('express');

//controllers
const { create, update, deleted, getItems } = require('../controllers/songs');

//validators
const { songValidator } = require('../validators/songs');

//utils
const { verifyToken, onlyOwner } = require('../utils/tokenVerify');

//middleware
const { albumExists } = require('../middlewares/albums');
const { songExists } = require('../middlewares/songs');

const songsRouter = express.Router();

//htttp://localhost:port/api/v1/user GET,POST,DELET,PUT
songsRouter.post("/:albumId", verifyToken, albumExists, onlyOwner, songValidator,create);
songsRouter.patch("/:id", verifyToken, songExists, onlyOwner,update);
songsRouter.delete("/:id", verifyToken, songExists, onlyOwner,deleted);
songsRouter.get("/:albumId", albumExists,getItems);

module.exports = { songsRouter };