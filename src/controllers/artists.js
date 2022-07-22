const { ref, uploadBytes, getDownloadURL } = require('firebase/storage');

//models
const { Artists } = require("../models/artists");

//utils
const { catchAsync } = require("../utils/catchAsync");
const { AppError } = require('../utils/appError');
const { storage } = require('../utils/firebase.config');
const { Albums } = require('../models/albums');
const { Songs } = require('../models/songs');

//controllers
const create = catchAsync(async (req,res,next)=>{
    const { userSession } = req;
    const { name,genre } = req.body;
    const ext = req.file.originalname.split('.').pop();
    const imgRef = ref(storage, `artistsImgs/${name}/file-${Date.now()}.${ext}`);
    const imgRes = await uploadBytes(imgRef, req.file.buffer);
    const imgUrl = await getDownloadURL(ref(storage,imgRes.metadata.fullPath));

    const newArtists = await Artists.create({
        name,
        genre,
        imgUrl,
        userId: userSession.id
    });

    res.status(201).json({
        status: 'success',
        newArtists
    });
});

const update = catchAsync(async (req,res,next)=>{
    const { artists } = req;
    const { name } = req.body;

    if (name) {
        await artists.update({
            name
        });
    };

    res.status(200).json({
        status: 'success'
    });
});

const deleted = catchAsync(async (req,res,next)=>{
    const { artists } = req;

    await artists.update({
        status: 'delete'
    });

    res.status(200).json({
        status: 'success'
    });
});

const getItems = catchAsync(async (req,res,next)=>{
    const data = await Artists.findAll({
        where: {
            status: 'active'
        },
        include: [
            {
                model: Albums,
                include: {
                    model: Songs,
                    required: false,
                    where: {
                        status: 'active'
                    },
                    attributes: { exclude: ['albumId','status'] }
                },
                required: false,
                where: {
                    status: 'active'
                },
                attributes: { exclude: ['artistId','status'] }
            }
        ],
        attributes: { exclude: ['userId','status'] }
    });

    if (!data.length) {
        return next(new AppError('Artists not found',404));
    };

    res.status(200).json({
        status: 'success',
        data
    });
});

module.exports = {
    create,
    update,
    deleted,
    getItems,
};