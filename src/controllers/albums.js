const { ref, uploadBytes, getDownloadURL } = require('firebase/storage');

//models
const { Albums } = require('../models/albums');

//utils
const { catchAsync } = require("../utils/catchAsync");
const { storage } = require('../utils/firebase.config');

//controllers
const create = catchAsync(async (req,res,next)=>{
    const { artists } = req;
    const { title,genre } = req.body;
    const ext = req.file.originalname.split('.').pop();
    const imgRef = ref(storage, `albumsImgs/${artists.name}/${title}/file-${Date.now()}.${ext}`);
    const imgRes = await uploadBytes(imgRef, req.file.buffer);
    const imgUrl = await getDownloadURL(ref(storage,imgRes.metadata.fullPath));

    const newAlbum = await Albums.create({
        title,
        genre,
        imgUrl,
        artistId: artists.id
    });

    res.status(201).json({
        status: 'success',
        newAlbum
    });
});

module.exports = {
    create,
};