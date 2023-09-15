// create web server
var express = require('express');
var app = express();
// create database
var mongojs = require('mongojs');
var db = mongojs('commentlist', ['commentlist']);
// create body-parser
var bodyParser = require('body-parser');

// create public folder
app.use(express.static(__dirname + "/public"));

// create body-parser
app.use(bodyParser.json());

// create get request
app.get('/commentlist', function (req, res) {
    console.log("I received a get request");
    // find data in database
    db.commentlist.find(function (err, docs) {
        console.log(docs);
        // send data to controller
        res.json(docs);
    });
});

// create post request
app.post('/commentlist', function (req, res) {
    console.log(req.body);
    // insert data to database
    db.commentlist.insert(req.body, function (err, doc) {
        // send data to controller
        res.json(doc);
    });
});

// create delete request
app.delete('/commentlist/:id', function (req, res) {
    var id = req.params.id;
    console.log(id);
    // remove data from database
    db.commentlist.remove({ _id: mongojs.ObjectId(id) }, function (err, doc) {
        // send data to controller
        res.json(doc);
    });
});

// create get request
app.get('/commentlist/:id', function (req, res) {
    var id = req.params.id;
    console.log(id);
    // find data in database
    db.commentlist.findOne({ _id: mongojs.ObjectId(id) }, function (err, doc) {
        // send data to controller
        res.json(doc);
    });
});

// create put request
app.put('/commentlist/:id', function (req, res) {
    var id = req.params.id;
    console.log(req.body.name);
    // update data in database
    db.commentlist.findAndModify({
        query: { _id: mongojs.ObjectId(id) },
        update: { $set: { name: req.body.name, comment: req.body.comment } },
        new: true
    }, function (err, doc) {
        // send data to controller
        res.json(doc);
    });
});

// create listen request
app.listen(3000);
console.log("Server running on port 3000");