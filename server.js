const express = require('express');
const assert = require("assert");
const CRUD = require("./CRUD");
const path = require("path");
const passport = require('passport');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

const app = express();
const configDB = require('./config/mongoose/database.js');

mongoose.connect(configDB.url, {useNewUrlParser: true});

require("./config/passport/passport")(passport);

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
 * POST method that authenticates a user using credentials
 */
app.post('/API/loginUser', (req, res, next) => {
    CRUD.loginUser(req, res, next);
});

app.get('/API/events/:id', (req, res, next) =>{
    CRUD.getEvents(req, res, next);
});

app.get('/API/events/:userid/:eventid', (req, res, next) =>{
    CRUD.getUserEvent(req, res, next);
});

app.post('/API/submit_event', (req, res, next) =>{
    CRUD.submitEvent(req, res, next);
});

app.listen(process.env.PORT || 5000, () => {
    console.log("Listening on :5000");
});
