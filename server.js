const express = require('express');
const mysql = require("mysql");
const assert = require("assert");
const CRUD = require("./CRUD");
const path = require("path");
const passport = require('passport');
const bodyParser = require("body-parser");

const app = express();

//Uses static directory "public"
//app.use(express.static("public"));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "frontend/build")));
app.use(passport.initialize());


/**
 * POST method that registers a new user
 */
app.post('/API/registerUser', (req, res, next) => {
    CRUD.registerUser(req, res, next)
});

/**
 * GET method that authenticates a user using credentials
 */
app.get('/API/loginUser', (req, res, next) => {
    CRUD.loginUser(req, res, next);
});

/*
//get last weight for a user
app.get("/API/myWeight/last/:userId", function (req, res) {
    // search db if user already has a document of weights add value

    MongoClient.connect(DBurl, function (err, db) {
        assert.equal(null, err);
        console.log("Connected successfully to server");

        CRUD.getLastWeight(db, function (w) {
            db.close();
            res.send(w);
        }, Number(req.params.userId));
    });
});*/

app.listen(process.env.PORT || 5000, () => {
    console.log("Listening on :5000");
});
