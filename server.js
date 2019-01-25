const express = require("express");
const mysql = require("mysql");
const bcrypt = require('bcrypt');
const assert = require("assert");
const CRUD = require("./CRUD");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");



//Uses static directory "public"
//app.use(express.static("public"));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "frontend/build")));

/*
//post a new weight  for a user
app.post("/API/myWeight/:userId/:value", function (req, res) {
    MongoClient.connect(DBurl, function (err, db) {
        assert.equal(null, err);
        console.log("Connected successfully to server");
        CRUD.insertWeight(db, function (weights) {
            db.close();
            res.send(weights);
        }, Number(req.params.userId), Number(req.params.value));
    });
});

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

app.get("/API/secret", (req, res)=>{
    res.send('The password is potato');
});

app.get("/API/login/:userData", (req, res) => {
    let encoded = req.params.userData;
    let decoded = base64.decode(encoded);
    let params = utf8.decode(decoded).split(";;;");

    let connection = mysql.createConnection(process.env.JAWSDB_URL);
    connection.connect();
    connection.query("SELECT * FROM USERS WHERE EMAIL=\"" + params[0] + "\";", (err, rows, fields) => {
        if (err) {
            console.log(err);
            return;
        }
        let user = null;
        if (rows[0].PASSWORD === params[1]) {
            user = {
                id: rows[0].ID,
                name: rows[0].NAME,
                email: params[0]
            };
            console.log("login success");
        }
        res.send(user);
    });
    connection.end();
});

app.get("/API/signin/:userData", (req, res) => {
    let encoded = req.params.userData;
    let decoded = base64.decode(encoded);
    let params = utf8.decode(decoded).split(";;;");

    let connection = mysql.createConnection(process.env.JAWSDB_URL);
    connection.connect();
    try {
        connection.query("INSERT INTO USERS (NAME, EMAIL, PASSWORD) " +
            "VALUES (\"" + params[0] + "\",\"" + params[1] + "\",\"" + params[2] + "\");", (err, rows, fields) => {
            if (err) {
                console.log(err);
                throw err;
            }
        });
        connection.query("SELECT ID, NAME FROM USERS WHERE EMAIL=\"" + params[1] + "\";", (err, rows, fields) => {
            if (err) {
                console.log(err);
                return;
            }

            let user = {
                id: rows[0].ID,
                name: rows[0].NAME,
                email: params[1]
            };

            res.send(user);
        });
    } catch (err) {
        console.log(err);
        res.send(err);
    } finally {
        connection.end();
    }

});

app.listen(process.env.PORT || 80, () => {
    console.log(process.env.PORT);
    console.log("Listening on :80");
});
