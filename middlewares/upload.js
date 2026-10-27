const multer = require('multer');
const AppError = require('../utils/AppError');

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname.replace(/\s+/g, '-'))
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) cb(null, true);
    else cb(new AppError('Chỉ chấp nhận file ảnh', 400), false);
};

module.exports = multer({ storage, limits: { fileSize: 2 * 1024 * 1024 }, fileFilter });