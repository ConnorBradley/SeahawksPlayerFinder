var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var assert = require('assert');

var url = 'mongodb://localhost:27017/seahawksapp';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/search/num/', function(req, res, next) {
  var num = req.query.number;
  var playerDetails = [];
  console.log('Number search for player: ' + num);
  mongo.connect(url, function(err, db) {
      assert.equal(null, err);
      var cursor = db.collection('players').find({number : num});
      cursor.forEach(function(doc, err) {
        assert.equal(null, err);
        playerDetails.push(doc);
        console.log(playerDetails);
    }, function() {
      db.close();
      res.render('index', {items: playerDetails});
      });
    });
  });

router.post('/addplayer', function(req, res, next) {

  var player = {
    number : req.body.number,
    name : req.body.name,
    age : req.body.age,
    position : req.body.position,
    college : req.body.college,
    height : req.body.height,
    weight : req.body.weight,
    experience : req.body.experience,
    votes : 0
  };

  var playerVotes = {
    number : req.body.number,
    votes : 0
  };

  mongo.connect(url, function(err, db) {
      assert.equal(null, err);
      //add to players
      db.collection('players').insertOne(player, function(err, result) {
        assert.equal(null, err);
        console.log('Player added to players table');
      });
      db.close();
    });
  res.redirect('/');
});

router.post('/voteplayer', function(req, res, next) {
  var isUpvote = false;
  var player;
  var votes;
  isUpvote = req.query.isUpvote;
  player = req.query.player;

  //getvotes
  mongo.connect(url, function (err, db) {
    assert.equal(null, err);
    var cursor = db.collection('players').find({number : player});
    votes = cursor['votes'];
    console.log('Player has ' + votes);
    votes++;
    db.collection('players').updateOne({"number": player}, {$set: uStudent}, function (err, result) {
  });
  //updatevotes
});
});


module.exports = router;
