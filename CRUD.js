const User = require('sequelize');
const jwtSecret = require('./config/passport/jwtConfig');
const jwt = require('jsonwebtoken');
const passport = require( 'passport');

/**
 * Method meant to register a user
 * @param req
 * @param res
 * @param next
 */
exports.registerUser = (req, res, next) => {
    passport.authenticate('register', (err, user, info) => {
        if (err) {
            console.log(err);
        }
        if (info !== undefined) {
            console.log(info.message);
            res.send(info.message);
        } else {
            req.logIn(user, err => {
                const data = {
                    name: req.body.name,
                    username: req.body.username,
                };
                User.findOne({
                    where: {
                        username: data.username,
                    },
                }).then(user => {
                    user
                        .update({
                            name: data.name,
                        })
                        .then(() => {
                            console.log('user created in db');
                            res.status(200).send({message: 'user created'});
                        });
                });
            });
        }
    })(req, res, next);
};

/**
 * Method meant to login a user
 * @param req
 * @param res
 * @param next
 */
exports.loginUser = (req, res, next) => {
    passport.authenticate('login', (err, user, info) => {
        if (err) {
            console.log(err);
        }
        if (info !== undefined) {
            console.log(info.message);
            res.send(info.message);
        } else {
            req.logIn(user, err => {
                User.findOne({
                    where: {
                        username: req.body.username,
                    },
                }).then(user => {
                    const token = jwt.sign({id: user.username}, jwtSecret.secret);
                    res.status(200).send({
                        auth: true,
                        token: token,
                        message: 'user found & logged in',
                    });
                });
            });
        }
    })(req, res, next);
};

/**
 * Method meant to find a user
 * @param req
 * @param res
 * @param next
 */
exports.findUser = (req, res, next) => {
    passport.authenticate('jwt', {session: false}, (err, user, info) => {
        if (err) {
            console.log(err);
        }
        if (info !== undefined) {
            console.log(info.message);
            res.send(info.message);
        } else {
            console.log('user found in db from route');
            res.status(200).send({
                auth: true,
                name: user.name,
                username: user.username,
                message: 'user found in db',
            });
        }
    })(req, res, next);
};