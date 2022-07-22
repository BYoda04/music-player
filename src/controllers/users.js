const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//models
const { Users } = require('../models/users');

//utils
const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/appError');
const { Email } = require('../utils/email');
const { Albums } = require('../models/albums');
const { Artists } = require('../models/artists');
const { Songs } = require('../models/songs');

//controllers
const signUp = catchAsync(async (req,res,next)=>{
    const { name,email,password } = req.body;

    const salt = await bcrypt.genSalt(12);
    const encryptPass = await bcrypt.hash(password,salt);

    const newUser = await Users.create({
        name,
        email,
        password: encryptPass
    });

    newUser.password = undefined;

    //send welcome email
    await new Email(email).sendWelcome(name);

    res.status(201).json({
        status: 'success',
        newUser
    });
});

const login = catchAsync(async (req,res,next)=>{
    const { email, password } = req.body;

    const user = await Users.findOne({
        where:{
            email,
            status:'active'
        }
    });

    if (!user) {
        return next(new AppError('User not exist',404));
    };

    const validPass = await bcrypt.compare(password,user.password);

    if (!validPass) {
        return next(new AppError('Invalid password',404));
    };

    const token = jwt.sign({ 
        id: user.id,
    },process.env.JWT_SIGN,{
        expiresIn:'24h',
    });

    res.status(200).json({
        status:'succes',
        token
    })
})

const update = catchAsync(async (req,res,next)=>{
    const { user } = req;
    const { name,email } = req.body;

    if (name) {
        await user.update({ name });
    };

    if (email) {
        if (!email.includes("@")) {
            return next(new AppError('Must provide a valid email',404));
        };
        
        await user.update({ email });
    };

    res.status(201).json({ status: 'success' });
})

const deleted = catchAsync(async (req,res,next)=>{
    const { user } = req;

    await user.update({ status: 'delete' });

    const artist = await Artists.findOne({
        where: {
            userId: user.id,
            status: 'active'
        }
    });

    await artist.update({
        status: 'delete'
    })

    const albums = await Albums.findAll({
        where: {
            artistId: artist.id,
            status: 'active'
        }
    });

    const promises = albums.map(async album=>{
        album.update({
            status: 'delete'
        });

        const songs = await Songs.findAll({
            where: {
                albumId: album.id,
                status: 'active'
            }
        });

        songs.map(song=>{
            song.update({
                status: 'delete'
            });
        });
    });

    await Promise.all(promises);

    res.status(201).json({ status: 'success' });
});

const getItems = catchAsync(async (req,res,next)=>{
    const data = await Users.findAll({
        where: {
            status: 'active'
        },
        attributes: { exclude: ['password','status'] }
    });

    if (!data.length) {
        return next(new AppError('Users not found'));
    };

    res.status(200).json({
        status: 'success',
        data
    });
});

module.exports = {
    signUp,
    login,
    update,
    deleted,
    getItems,
};