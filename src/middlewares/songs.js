//models
const { Songs } = require("../models/songs");
const { Albums } = require("../models/albums");
const { Artists } = require("../models/artists");

//utils
const { catchAsync } = require("../utils/catchAsync");
const { AppError } = require("../utils/appError");

const songExists = catchAsync(async (req,res,next)=>{
    const { id } = req.params;

    const song = await Songs.findOne({
        where: {
            id,
            status: 'active'
        }
    });

    if (!song) {
        return next(new AppError('Song not found',404));
    };

    const album = await Albums.findOne({
        where: {
            id: song.albumId,
            status: 'active',
        }
    });

    const artist = await Artists.findOne({
        where: {
            id: album.artistId,
            status: 'active'
        }
    });

    req.song = song;
    req.user = {
        id: artist.userId
    };

    next();
});

module.exports = { songExists };