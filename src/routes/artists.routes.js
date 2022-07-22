const express = require('express');

//controllers
const { create, update, deleted, getItems } = require('../controllers/artists');

//validators
const { artistsValidator } = require('../validators/artists');

//utils
const { verifyToken, onlyOwner } = require('../utils/tokenVerify');
const { upload } = require('../utils/upload');

//middleware
const { artistsExists } = require('../middlewares/artists');

const artistsRouter = express.Router();

//htttp://localhost:port/api/v1/user GET,POST,DELET,PUT
artistsRouter.post("/", verifyToken, upload.single("img"), artistsValidator,create);
artistsRouter.patch("/:id", verifyToken, artistsExists, onlyOwner,update);
artistsRouter.delete("/:id", verifyToken, artistsExists, onlyOwner,deleted);
artistsRouter.get("/",getItems);

module.exports = { artistsRouter };