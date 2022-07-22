//models
const { Songs } = require('../models/songs');

//utils
const { catchAsync } = require("../utils/catchAsync");
const { AppError } = require('../utils/appError');

//controllers
const create = catchAsync(async (req,res,next)=>{
    const { album } = req;
    const { title } = req.body;

    const newSong = await Songs.create({
        title,
        albumId: album.id
    });

    res.status(201).json({
        status: 'success',
        newSong
    });
});

const update = catchAsync(async (req,res,next)=>{
    const { song } = req;
    const { title } = req.body;

    if (title) {
        await song.update({
            title
        });
    };

    res.status(200).json({
        status: 'success'
    });
});

const deleted = catchAsync(async (req,res,next)=>{
    const { song } = req;

    await song.update({
        status: 'delete'
    });

    res.status(200).json({
        status: 'success'
    });
});

const getItems = catchAsync(async (req,res,next)=>{
    const { album } = req;

    res.status(200).json({
        status: 'success',
        album
    });
});

module.exports = {
    create,
    update,
    deleted,
    getItems,
};