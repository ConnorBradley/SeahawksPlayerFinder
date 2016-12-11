var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var assert = require('assert');
var Player = require('../players.js');
var Comment = require('../comment.js');


var url = 'mongodb://localhost:27017/seahawksapp';
module.exports = Comment;

router.post('/addcomment', function(req, res, next) {
    console.log('made it here')
    var comment = new Comment(req.query.num, req.query.message);
    console.log(comment);
    comment.AddComment();
    res.redirect('index');
});

router.get('/getcomments', function(req, res, next) {
  console.log('here');
    mongo.connect(url, function(err, db) {
        var query = {
            'number': req.body.num
        };
        var comments = [];
        //selects 1 from comments table that has number = num
        var cursor = db.collection('comments').find(query).toArray();
        cursor.forEach(function(doc, err) {
            assert.equal(null, err);
            comments.push(doc);
        }, function() {
            db.close();
            res.render('index', {
                items: comments
            });
        });
    });
});
