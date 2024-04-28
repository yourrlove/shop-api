const allowedOrigins = require('../configs/CORS/allowedOrigins');

const credentials = (req, res, next) => {
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.
        res.header('Access-Control-Allow-Credentials', true);
    }
    next();
}

module.exports = credentials