//models
const { Albums } = require("../models/albums");
const { Artists } = require("../models/artists");
const { Songs } = require("../models/songs");

//utils
const { catchAsync } = require("../utils/catchAsync");
const { AppError } = require("../utils/appError");

const albumExists = catchAsync(async (req,res,next)=>{
    const { albumId } = req.params;

    const album = await Albums.findOne({
        where: {
            id: albumId,
            status: 'active'
        },
        include: [
            {
                model: Artists,
                required: false,
                where: {
                    status: 'active'
                },
                attributes: { exclude: ['userId','status'] }
            },
            {
                model: Songs,
                required: false,
                where: {
                    status: 'active'
                },
                attributes: { exclude: ['albumId','status'] }
            }
        ],
        attributes: { exclude: ['status'] }
    });

    if (!album) {
        return next(new AppError('Album not found',404));
    };

    const artist = await Artists.findOne({
        where: {
            id: album.artistId,
            status: 'active'
        }
    });

    req.album = album;
    req.user = {
        id: artist.userId
    };

    next();
});

module.exports = { albumExists };