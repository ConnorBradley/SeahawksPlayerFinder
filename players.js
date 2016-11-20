var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var assert = require('assert');

var url = 'mongodb://localhost:27017/seahawksapp';
var number = 0;
var name = 'name';
var position = 'position';
var age = 'age';
var height = 'height';
var weight = 'weight';
var college = 'college';
var experience = 'experience';
var votes = 0;

module.exports = Player;

function Player() {
  //theres no official overloading in js since its not a strongly typed language.
  //this is a fairly neat work around.
  if (arguments > 0) {
    this.number = arguments[0];
    this.name = arguments[1];
    this.position = arguments[2];
    this.age = arguments[3];
    this.height = arguments[4];
    this.weight = arguments[5];
    this.college = arguments[6];
    this.experience = arguments[7];
    this.votes = arguments[8];
    }
    else {
      //create blank constructor
      this.number = 0;
      this.name = 'name';
      this.position = 'position';
      this.age = 'age';
      this.height = 'height';
      this.weight = 'weight';
      this.college = 'college';
      this.experience = 'experience';
      this.votes = 0;
    }
}


Player.prototype.AddPlayer = function(newplayer) {
  mongo.connect(url, function(err, db) {
    assert.equal(null, err);
    //add to players
    db.collection('players').insert(newplayer, function(err, result) {
      assert.equal(null, err);
      console.log('Player added to players table, details: ' +  newplayer);
    });
    db.close();
  });
};

Player.prototype.findByNum = function(obj, num, cb ) {
  mongo.connect(url, function(err, db) {
      var query = { 'number' : num };
      //selects top 1 from players table that has number = num, then asigns the player details to the variables passed in.
       db.collection('players', function(err, collection) {
        collection.findOne(query, function(err, item) {
          console.log(err);
          console.log(item);
          if (err) {
              res.send(err);
            }
            else {
              obj.number = item['number'];
              obj.name = item['name'];
              obj.position = item['position'];
              obj.age = item['age'];
              obj.weight = item['weight'];
              obj.height = item['height'];
              obj.college = item['college'];
              obj.experience = item['experience']
              obj.votes = item['votes'];
              db.close();
              cb();
            }
          });
        });
    });
};

Player.prototype.findByName = function(res, obj, name, cb ) {
  mongo.connect(url, function(err, db) {
      var regexValue='\.*'+name+'\.';
      var query = { 'name' : new RegExp(regexValue, 'i')};
      console.log(query);
      //selects top 1 from players table that has name = name, then asigns the player details to the variables passed in.
       db.collection('players', function(err, collection) {
        collection.findOne(query, function(err, item) {
          console.log(err);
          console.log(item);
          if (err) {
              res.send(err);
            }
            else if (item ===  null){
              res.send('No players found');
            }
            else {
              obj.number = item['number'];
              obj.name = item['name'];
              obj.position = item['position'];
              obj.age = item['age'];
              obj.weight = item['weight'];
              obj.height = item['height'];
              obj.college = item['college'];
              obj.experience = item['experience']
              obj.votes = item['votes'];
              db.close();
              cb();
            }
          });
        });
    });
};
Player.prototype.VotePlayer = function(positiveRating) {
  //TODO: This isn't working yet, get the Select working first.
  var isUpvote = false;
  var player;
  var votes;
  isUpvote = req.query.isUpvote;
  player = req.query.player;

  mongo.connect(url, function (err, db) {
      assert.equal(null, err);
      var cursor = db.collection('players').find({number : player});
      votes = cursor['votes'];
      console.log('Player has ' + votes);
      votes++;
      //db.collection('players').updateOne({"number": player}, {$set: uStudent}, function (err, result) {
      //});
  });
};
