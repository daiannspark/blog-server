import jwt from 'jsonwebtoken';
import AuthError from '../errors/AuthError';
import {getUserById, getUserByEmail} from '../models/UserModel';

const logger = require('../utils/logger')('authenticate');

const jwtVerify = token =>
    new Promise(resolve => {
        jwt.verify(token, process.env.JWT_SECRET, (error, decodedToken) => {
            resolve(decodedToken);
        });
    });

const authMiddleware = async (req, res, next) => {
    if (process.env.SKIP_AUTH) {
        return next();
    }

    const { authorization } = req.headers;
    let token;
    if (authorization) {
        [, token] = authorization.split(' ');
    }

    if (token) {
        const decodedToken = await jwtVerify(token);

        if (decodedToken && decodedToken.data && decodedToken.data.username) {
            const { username } = decodedToken.data;
            const user = await getUserByEmail (username);
            if (user) {
                logger.log('debug', `User: ${username} was successfully authenticated`);
                req.user = user;
                return next();
            }
        }
        return next(new AuthError('No such user'));
    }
    return next(new AuthError('No token provided'));
};

export default authMiddleware;
