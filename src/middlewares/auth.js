const { AuthFailureError, ForbiddenRequestError } = require('../core/error.response');
const JWT = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authorizationHeader = req.headers['authorization'];
    if (!authorizationHeader) throw new AuthFailureError('Invalid Request');
    const token = authorizationHeader.split(' ')[1];
    if (!token) throw new AuthFailureError('Invalid Request');
    JWT.verify(token, process.env.ACCESS_TOKEN_KEY_SECRET, (err, decoded) => {
        if (err) throw new ForbiddenRequestError('Unauthorized request');
        req.user = decoded;
        console.log(decoded);
        next();
    });
}

module.exports = {
    verifyToken
}