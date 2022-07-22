const { body, check, validationResult } = require('express-validator');

//utils
const { AppError } = require('../utils/appError');

const checkResult = (req, res, next) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		// Array has errors
		const errorMsgs = errors.array().map(err => err.msg);

		const message = errorMsgs.join('. ');

		return next(new AppError(message, 400));
	}

	next();
};

const checkParameters =async (req,res,next)=>{
	const ext = ['jpg','jpeg','png','gif','tiff','psd','bmp','webp'];

	if (!req.file) {
		return next(new AppError('Products need a picture',404));
	};

    const imgExt = req.file.originalname.split('.').pop();
    if (!ext.includes(imgExt)) {
        return next(new AppError(`Invalid format ${imgExt}`,404));
    };

    next();
};

const artistsValidator = [
	body('name').notEmpty().withMessage('Name cannot be empty'),
	body('genre').notEmpty().withMessage('Genre cannot be empty'),
	checkResult,
    checkParameters,
];

module.exports = { artistsValidator };