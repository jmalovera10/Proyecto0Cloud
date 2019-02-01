const jwtSecret = require('./config/passport/jwtConfig');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const User = require('./config/mongoose/conf');
const mysql = require("mysql");

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
            res.send(info);
        } else {
            req.logIn(user, err => {
                const data = {
                    name: req.body.name,
                    email: req.body.email,
                };
                User.findOne({email: data.email,})
                    .then((user) => {
                        user.updateOne({
                            name: data.name,
                        }).then(() => {
                            console.log('user created in db');
                            const token = jwt.sign({id: user._id}, jwtSecret.secret);
                            res.status(200).send({
                                message: null,
                                auth: true,
                                token: token,
                                id: user._id
                            });
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
    console.log(req.body);
    passport.authenticate('login', (err, user, info) => {
        if (err) {
            console.log(err);
        }
        if (info !== undefined) {
            console.log(info.message);
            res.send(info);
        } else {
            req.logIn(user, err => {
                User.findOne({email: req.body.email}).then(user => {
                    const token = jwt.sign({id: user._id}, jwtSecret.secret);
                    res.status(200).send({
                        auth: true,
                        token: token,
                        message: null,
                        id: user._id
                    });
                });
            });
        }
    })(req, res, next);
};

/**
 * Method meant to find a user from a given token
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

exports.getEvents = (req, res, next) => {
    let userId = req.params.userId;
    let connection = mysql.createConnection({
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE
    });

    connection.connect();

    connection.query('SELECT * FROM EVENTS WHERE USER_ID="' + userId + '" ORDER BY ID DESC;',
        function (err, rows, fields) {
            if (err) {
                console.log(err);
                res.json({ message:'No se pudo agregar el evento, revise sus parámetros e intente nuevamente'});
            }
            res.json(rows);
        });

    connection.end()
};

exports.getUserEvent = (req, res, next) => {
    let userId = req.params.userid;
    let eventId = req.params.eventid;
    let connection = mysql.createConnection({
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE
    });

    connection.connect();

    connection.query('SELECT * FROM EVENTS WHERE USER_ID="' + userId + '" AND ID='+eventId+';',
        function (err, rows, fields) {
            if (err) {
                console.log(err);
                res.json({ message:'No se pudo agregar el evento, revise sus parámetros e intente nuevamente'});
            }
            res.json(rows);
        });

    connection.end()
};

exports.submitEvent = (req, res, next) => {
    let ev = req.body;
    console.log(ev);
    let connection = mysql.createConnection({
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE
    });

    connection.connect();

    connection.query('INSERT INTO EVENTS (USER_ID, NAME, CATEGORY, PLACE, DIRECTION, INIT_DATE, END_DATE, MODE) ' +
        'VALUES ("' + ev.userId + '", "' + ev.name + '", "' + ev.category + '", "' + ev.place + '", "' + ev.direction + '", "'
        + ev.initDate + '", "' + ev.endDate + '", "' + ev.mode + '");',
        function (err, rows, fields) {
            if (err) {
                console.log(err);
                res.json({ message:'No se pudo agregar el evento, revise sus parámetros e intente nuevamente'});
            }
            res.json({
                message:'El evento ha sido agregado satisfactoriamente',
                event: ev
            });
        });

    connection.end()
};

exports.editEvent = (req, res, next) => {
    let ev = req.body;
    let userId = req.params.userId;
    let connection = mysql.createConnection({
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE
    });

    connection.connect();

    connection.query('UPDATE EVENTS SET NAME="'+ev.name+'", CATEGORY="'+ev.category+'", PLACE="'+ev.place+'", ' +
        'DIRECTION="'+ev.direction+'", INIT_DATE="'+ev.initDate+'", END_DATE="'+ev.endDate+'", MODE="'+ev.mode+'"' +
        'WHERE ID='+ev.id+' AND USER_ID="'+userId+'";',
        function (err, rows, fields) {
            if (err) {
                console.log(err);
                res.json({ message:'No se pudo editar el evento, revise sus parámetros e intente nuevamente'});
            }
            res.json(rows)
        });

    connection.end()
};

exports.deleteEvent = (req, res, next) => {
    let eventId = req.params.eventId;
    let userId = req.params.userId;
    let connection = mysql.createConnection({
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE
    });

    connection.connect();

    connection.query('DELETE FROM EVENTS WHERE USER_ID="' + userId + '" AND ID='+eventId+';',
        function (err, rows, fields) {
            if (err) {
                console.log(err);
                res.json({ message:'No se pudo agregar el evento, revise sus parámetros e intente nuevamente'});
            }
            res.json(rows);
        });

    connection.end()
};