const assert = require("assert");
//insert a new weight (or update if in the same day)
exports.insertWeight = function (db, callback, userId, weight) {
    const dbase = db.db("nutrition"); //here
    // Get the documents collection
    let collection = dbase.collection("weights");
    try {
        collection.find({"userId": userId}).toArray(function (err, docs) {
            assert.equal(err, null);
            console.log("Found the following records");
            console.log(docs);
            let weights = [];
            let dates = [];
            if (docs && docs.length > 0) {
                weights = docs[0].weights;
                dates = docs[0].dates;
            }
            let todate = new Date();
            todate = todate / 3600000;
            if (dates && dates.length > 0) {
                let date = dates[dates.length - 1];
                if (todate - date < 8) {
                    weights.pop();
                    weights.push(weight);
                    dates.pop();
                    dates.push(todate);
                }
                else {
                    weights.push(weight);
                    dates.push(todate);
                }
            }
            else {
                weights.push(weight);
                dates.push(todate);
            }
            collection.updateOne({userId: userId}
                , {$set: {weights: weights, dates: dates}}, {upsert: true},
                function (err, result) {
                    assert.equal(err, null);
                    assert.equal(1, result.result.n);
                    console.log("Added weight");
                    callback(result);
                });
        });
    }
    catch (err) {
        dbase.createCollection("weights", {size: 2148});
        collection = dbase.collection("weights");
        console.log(collection);
        collection.updateOne({userId: userId}
            , {$set: {weights: [weight]}}, {upsert: true},
            function (err, result) {
                assert.equal(err, null);
                assert.equal(1, result.result.n);
                console.log("Added weight");
                callback(result);
            });
    }
};
//insert a challenge
exports.insertChallenge = function (db, callback, userId, challenge) {
    const dbase = db.db("nutrition"); //here
    // Get the documents collection
    let collection = dbase.collection("challenges");
    try {
        collection.find({"userId": userId}).toArray(function (err, docs) {
            assert.equal(err, null);
            console.log("Found the following records");
            console.log(docs);
            let challenges = [];
            try {
                let newChallenge = {};
                newChallenge.kcals = challenge.kcals;
                newChallenge.carbohydrates = challenge.carbohydrates;
                newChallenge.protein = challenge.protein;
                newChallenge.fat = challenge.fiber;
                newChallenge.fiber = challenge.fiber;
                newChallenge.date = new Date();
                if (docs && docs.length > 0) {
                    challenges = docs[0].challenges;
                }

                challenges.push(newChallenge);
                collection.updateOne({userId: userId}
                    , {$set: {challenges: challenges}}, {upsert: true},
                    function (err, result) {
                        assert.equal(err, null);
                        assert.equal(1, result.result.n);
                        console.log("Added challenge");
                        callback(result);
                    });
            }
            catch (err) {
                callback(err);
            }


        });
    }
    catch (err) {
        try {
            let newChallenge = {};
            newChallenge.kcals = challenge.kcals;
            newChallenge.carbohydrates = challenge.carbohydrates;
            newChallenge.protein = challenge.protein;
            newChallenge.fat = challenge.fiber;
            newChallenge.fiber = challenge.fiber;
            newChallenge.date = new Date();
            dbase.createCollection("challenges", {size: 2148});
            collection = dbase.collection("challenges");
            console.log(collection);
            collection.updateOne({userId: userId}
                , {$set: {challenges: [challenge]}}, {upsert: true},
                function (err, result) {
                    assert.equal(err, null);
                    assert.equal(1, result.result.n);
                    console.log("Added challenge");
                    callback(result);
                });
        }
        catch (err) {
            callback(err);

        }

    }

};
//insert a new value in consumption
exports.insertConsumption = function (db, callback, userId, consumption) {
    const dbase = db.db("nutrition"); //here
    // Get the documents collection
    let collection = dbase.collection("consumptions");
    try {
        collection.find({"userId": userId}).toArray(function (err, docs) {
            assert.equal(err, null);
            console.log("Found the following records");
            console.log(docs);
            let consumptions = [];
            try {
                let newconsumption = {};
                newconsumption.kcals = consumption.kcals;
                newconsumption.carbohydrates = consumption.carbohydrates;
                newconsumption.protein = consumption.protein;
                newconsumption.fat = consumption.fiber;
                newconsumption.fiber = consumption.fiber;
                newconsumption.date = new Date();
                if (docs && docs.length > 0) {
                    consumptions = docs[0].consumptions;
                }

                consumptions.push(newconsumption);
                collection.updateOne({userId: userId}
                    , {$set: {consumptions: consumptions}}, {upsert: true},
                    function (err, result) {
                        assert.equal(err, null);
                        assert.equal(1, result.result.n);
                        console.log("Added consumption");
                        callback(result);
                    });
            }
            catch (err) {
                callback(err);
                return;
            }


        });
    }
    catch (err) {
        try {
            let newconsumption = {};
            newconsumption.kcals = consumption.kcals;
            newconsumption.carbohydrates = consumption.carbohydrates;
            newconsumption.protein = consumption.protein;
            newconsumption.fat = consumption.fiber;
            newconsumption.fiber = consumption.fiber;
            newconsumption.date = new Date();
            dbase.createCollection("consumptions", {size: 2148});
            collection = dbase.collection("consumptions");
            console.log(collection);
            collection.updateOne({userId: userId}
                , {$set: {consumptions: [consumption]}}, {upsert: true},
                function (err, result) {
                    assert.equal(err, null);
                    assert.equal(1, result.result.n);
                    console.log("Added consumption");
                    callback(result);
                });
        }
        catch (err) {
            callback(err);
        }

    }

};

//update last value of consumption
exports.updateConsumption = function (db, callback, userId, consumption) {
    const dbase = db.db("nutrition"); //here
    // Get the documents collection
    let collection = dbase.collection("consumptions");
    try {
        collection.find({"userId": userId}).toArray(function (err, docs) {
            assert.equal(err, null);
            console.log("Found the following records");
            console.log(docs);
            let consumptions = [];
            try {
                let newconsumption = {};
                newconsumption.kcals = consumption.kcals;
                newconsumption.carbohydrates = consumption.carbohydrates;
                newconsumption.protein = consumption.protein;
                newconsumption.fat = consumption.fiber;
                newconsumption.fiber = consumption.fiber;
                newconsumption.date = new Date();
                if (docs && docs.length > 0) {
                    consumptions = docs[0].consumptions;
                    newconsumption = consumptions.pop();
                    newconsumption.kcals += consumption.kcals;
                    newconsumption.carbohydrates += consumption.carbohydrates;
                    newconsumption.protein += consumption.protein;
                    newconsumption.fat += consumption.fiber;
                    newconsumption.fiber += consumption.fiber;
                }

                consumptions.push(newconsumption);
                collection.updateOne({userId: userId}
                    , {$set: {consumptions: consumptions}}, {upsert: true},
                    function (err, result) {
                        assert.equal(err, null);
                        assert.equal(1, result.result.n);
                        console.log("Added consumption");
                        callback(result);
                    });
            }
            catch (err) {
                callback(err);
                return;
            }


        });
    }
    catch (err) {
        try {
            let newconsumption = {};
            newconsumption.kcals = consumption.kcals;
            newconsumption.carbohydrates = consumption.carbohydrates;
            newconsumption.protein = consumption.protein;
            newconsumption.fat = consumption.fiber;
            newconsumption.fiber = consumption.fiber;
            newconsumption.date = new Date();
            dbase.createCollection("consumptions", {size: 2148});
            collection = dbase.collection("consumptions");
            console.log(collection);
            collection.updateOne({userId: userId}
                , {$set: {consumptions: [consumption]}}, {upsert: true},
                function (err, result) {
                    assert.equal(err, null);
                    assert.equal(1, result.result.n);
                    console.log("Added consumption");
                    callback(result);
                });
        }
        catch (err) {
            callback(err);
        }

    }

};

//to index all collections using userId
exports.indexCollections = function (db, callback) {
    const dbase = db.db("nutrition"); //here

    dbase.collection("weights").createIndex(
        {"userId": 1},
        null,
        function (err, results) {
            console.log(results);
            callback();
        }
    );
    dbase.collection("challenges").createIndex(
        {"userId": 1},
        null,
        function (err, results) {
            console.log(results);
            callback();
        }
    );
    dbase.collection("consumptions").createIndex(
        {"userId": 1},
        null,
        function (err, results) {
            console.log(results);
            callback();
        }
    );
};

//get all weights history for a user
exports.getWeights = function (db, callback, userId) {
    const dbase = db.db("nutrition"); //here

    // Get the documents collection
    let collection = dbase.collection("weights");

    collection.find({"userId": userId}).toArray(function (err, docs) {
        assert.equal(err, null);
        console.log("Found the following records");
        console.log(docs);
        callback(docs);
    });
};
//get all challenges for a user
exports.getChallenges = function (db, callback, userId) {
    const dbase = db.db("nutrition"); //here

    // Get the documents collection
    let collection = dbase.collection("challenges");

    collection.find({"userId": userId}).toArray(function (err, docs) {
        assert.equal(err, null);
        console.log("Found the following records");
        console.log(docs);
        callback(docs);
    });
};
//get all consumptions for a user
exports.getConsumptions = function (db, callback, userId) {
    const dbase = db.db("nutrition"); //here

    // Get the documents collection
    let collection = dbase.collection("consumptions");

    collection.find({"userId": userId}).toArray(function (err, docs) {
        assert.equal(err, null);
        console.log("Found the following records");
        console.log(docs);
        callback(docs);
    });
};
//get last item in weights
exports.getLastWeight = function (db, callback, userId) {
    const dbase = db.db("nutrition"); //here

    // Get the documents collection
    let collection = dbase.collection("weights");

    collection.find({"userId": userId}).toArray(function (err, docs) {
        assert.equal(err, null);
        console.log("Found the following records");
        console.log(docs);
        if (docs && docs.length > 0) {
            let weights = docs[0].weights;
            if (weights && weights.length > 0) {
                let w = weights[weights.length - 1];
                console.log(w);
                callback(JSON.stringify(w));
            } else {
                callback(null);
            }
        } else {
            callback(null);
        }
    });
};
//get last item in challenge
exports.getLastChallenge = function (db, callback, userId) {
    const dbase = db.db("nutrition"); //here

    // Get the documents collection
    let collection = dbase.collection("challenges");

    collection.find({"userId": userId}).toArray(function (err, docs) {
        assert.equal(err, null);
        console.log("Found the following records");
        console.log(docs);
        if (docs && docs.length > 0) {
            let challenges = docs[0].challenges;
            console.log(challenges);
            if (challenges && challenges.length > 0) {
                let w = challenges[challenges.length - 1];
                console.log("w: " + w);
                callback(w);
            } else {
                callback(null);
            }
        } else {
            callback(null);
        }

    });
};
//get last item in consumption
exports.getLastConsumption = function (db, callback, userId) {
    const dbase = db.db("nutrition"); //here

    // Get the documents collection
    let collection = dbase.collection("consumptions");

    collection.find({"userId": userId}).toArray(function (err, docs) {
        assert.equal(err, null);
        console.log("Found the following records");
        console.log(docs);
        if (docs && docs.length > 0) {
            let consumptions = docs[0].consumptions;
            if (consumptions && consumptions.length > 0) {
                let w = consumptions[consumptions.length - 1];

                callback(w);
            } else {
                callback(null);
            }
        } else {
            callback(null);
        }
    });
};

//to drop all collections
exports.dropCollections = function (db, callback, userId) {
    const dbase = db.db("nutrition"); //here

    // Get the documents collection
    let collection = dbase.collection("consumptions");
    collection.drop();
    collection = dbase.collection("weights");
    collection.drop();
    collection = dbase.collection("chsllenges");
    collection.drop();
    callback();
};
//calculate weight differnce over last two weeks (10 days)
exports.weightDifference = function (db, callback, userId) {
    const dbase = db.db("nutrition"); //here

    // Get the documents collection
    let collection = dbase.collection("weights");

    collection.find({"userId": userId}).toArray(function (err, docs) {
        assert.equal(err, null);
        console.log("Found the following records");
        console.log(docs);
        if (docs && docs.length > 0) {
            let weights = docs[0].weights;
            if (weights && weights.length > 10) {
                let firstLandmark = weights.length - 10;
                let secondLandmark = weights.length - 5;
                let previous = 0;
                let last = 0;
                let counter = 0;
                weights.forEach((w) => {
                    if (counter >= firstLandmark && counter < secondLandmark) {
                        previous += w;
                    }
                    else if (counter >= secondLandmark) {
                        last += w;
                    }
                    counter += 1;
                });
                previous = previous / 5;
                last = last / 5;
                let result = last - previous;
                let w = weights[weights.length - 1];
                console.log(result);
                callback(JSON.stringify(result));
            } else {
                callback(null);
            }
        } else {
            callback(null);
        }
    });
};