'use strict';

const JWT = require('jsonwebtoken');

const createKeyTokenPair = (payload, accessPrivatekey, refreshPrivatekey) => {
    try {
        //create accessToken
        const accessToken = JWT.sign( payload, accessPrivatekey, {
            expiresIn: '3 day'
        });

        //create refreshToken
        const refreshToken = JWT.sign( payload, refreshPrivatekey, {
            expiresIn: '5 day'
        });

        return { accessToken, refreshToken };
    } catch (err) {
        throw new Error(err);
    }
}

module.exports = {
    createKeyTokenPair
}