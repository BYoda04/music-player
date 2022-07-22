//models
const { FavoriteSongs } = require("../models/favoriteSongs");

//utils
const { catchAsync } = require("../utils/catchAsync");

//controllers
const create = catchAsync(async (req,res,next)=>{
    const { song,userSession } = req;

    let favorite = await FavoriteSongs.findOne({
        where: {
            userId: userSession.id,
            songId: song.id
        }
    });

    if (favorite) {
        await favorite.update({
            status: !favorite.status
        });

        return res.status(200).json({
            status: 'success',
            favorite
        });
    } else {
        favorite = await FavoriteSongs.create({
            userId: userSession.id,
            songId: song.id
        });
        
        return res.status(201).json({
            status: 'success',
            favorite
        });
    };
});

module.exports = {
    create,
};