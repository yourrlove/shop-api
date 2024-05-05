'use strict';

// Require the cloudinary library
const cloudinary = require('cloudinary').v2;

// Return "https" URLs by setting secure: true
cloudinary.config({
    cloud_name: 'yolo-shop',
    api_secret: process.env.CLOUDINARY_API_SECRET,
    api_key: '284821554366759',
});


module.exports = cloudinary;