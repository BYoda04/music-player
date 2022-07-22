//models
const { Artists } = require("../models/artists");

//utils
const { catchAsync } = require("../utils/catchAsync");
const { AppError } = require("../utils/appError");

const artistsExists = catchAsync(async (req,res,next)=>{
    const { id } = req.params;

    const artists = await Artists.findOne({
        where: {
            id,
            status: 'active'
        }
    });

    if (!artists) {
        return next(new AppError('Artists not found',404));
    };

    req.artists = artists;
    req.user = {
        id: artists.userId
    };

    next();
});

module.exports = { artistsExists };