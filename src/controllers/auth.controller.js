'use strict';
const AuthService = require('../services/auth.service');
const { CREATED, OK, NO_CONTENT } = require('../core/success.response');
const { AuthFailureError } = require('../core/error.response');

class AuthContoller {
    signUp = async (req, res, next) => {
        const { accessToken, refreshToken } = await AuthService.signUp(req.body);
        // set cookie
        res.cookie('jwt', refreshToken, {
            domain: 'api.yourrlove.com',
            path: '/',
            httpOnly: true,
            sameSite: 'None',
            secure: true,
            partitioned: true,
            maxAge: 60 * 60 * 24 * 1000
        });
        new CREATED({
            message: 'User created successfully',
            metadata: accessToken
        }).send(res);
    }

    logIn = async (req, res, next) => {
        const { accessToken, refreshToken } = await AuthService.logIn(req.body);
        // set cookie
        res.cookie('jwt', refreshToken, {
            // domain: 'api.yourrlove.com',
            path: '/',
            httpOnly: true,
            sameSite: 'strict',
            // secure: true,
            // partitioned: true,
            maxAge: 60 * 60 * 24 * 1000
        });
        new OK({
            message: 'Login successfully!',
            metadata: { accessToken, refreshToken }
        }).send(res);
    }

    logOut = async (req, res, next) => {
        const cookies = req.cookies;
        if(!cookies?.jwt) throw new AuthFailureError('Invalid Request!');
        await AuthService.logOut(cookies.jwt);
        // clear cookies
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true, partitioned: true });
        new NO_CONTENT({
            message: 'Logged out successfully!',
            metadata: {}
        }).send(res);
    }

    handleRefreshToken = async (req, res, next) => {
        const cookies = req.cookies;
        if(!cookies?.jwt) throw new AuthFailureError('Invalid Request!');
        const { accessToken, refreshToken } = await AuthService.handleRefreshToken(cookies.jwt);
        // set cookie
        res.cookie('jwt', refreshToken, {
            domain: 'api.yourrlove.com',
            path: '/',
            httpOnly: true,
            sameSite: 'None',
            secure: true,
            partitioned: true,
            maxAge: 60 * 60 * 24 * 1000
        });
        new OK({
            message: 'Provide access token successfully!',
            metadata: accessToken
        }).send(res);
    }
}

module.exports = new AuthContoller();