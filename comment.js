var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var assert = require('assert');

var url = 'mongodb://localhost:27017/seahawksapp';

module.exports = Comment;

function Comment(number, message) {
  this.number = number;
  this.message = message;
}

Comment.prototype.AddComment = function(comment) {
  mongo.connect(url, function(err, db) {
    assert.equal(null, err);
    //add to players
    db.collection('comment').insert(comment, function(err, result) {
      assert.equal(null, err);
      console.log('Comment added to comment table, details: ' +  comment);
    });
    db.close();
  });
}
