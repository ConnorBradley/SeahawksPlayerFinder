  var express = require('express');
  var router = express.Router();
  var mongo = require('mongodb').MongoClient;
  var objectId = require('mongodb').ObjectID;
  var assert = require('assert');
  var Player = require('../players.js');
  var Comment = require('../comment.js');

  var url = 'mongodb://localhost:27017/seahawksapp';

  /* GET home page. */
  router.get('/', function(req, res, next) {
      res.render('index', {
          title: 'seahawksapp'
      });
  });

  router.get('/search/num/', function(req, res, next) {
      var num = req.query.number;
      console.log('Number search for player: ' + num);
      //create blank player to manipulate further
      var playerDetails = new Player();
      //passes in the playerdetails obj to modify, the number to serach for and a callback function to use when its finished
      playerDetails.findByNum(res, playerDetails, num, function() {
          console.log(playerDetails);
          res.render('index', {
              items: playerDetails
          });
      });
  });

  router.get('/search/name/', function(req, res, next) {
      var name = req.query.name;
      console.log('Name search for player: ' + name);
      //create blank player to manipulate further
      var playerDetails = new Player();
      //passes in the playerdetails obj to modify, the number to serach for and a callback function to use when its finished
      playerDetails.findByName(res, playerDetails, name, function() {
          console.log(playerDetails);
          res.render('index', {
              items: playerDetails
          });
      });
  });


  router.post('/addplayer', function(req, res, next) {
      var newplayer = new Player(req.body.number,
          req.body.name,
          req.body.position,
          req.body.age,
          req.body.height,
          req.body.weight,
          req.body.college,
          req.body.experience,
          0
      );
      console.log(newplayer);
      newplayer.AddPlayer(newplayer);
      res.redirect('/');
  });

  router.post('/voteplayer', function(req, res, next) {
      var playerDetails = new Player();
      playerDetails.findByNum(res, playerDetails, req.body.number, function() {
          console.log(playerDetails);
          playerDetails.VotePlayer(playerDetails, req.body.vote, function() {
              res.render('index', {
                  items: playerDetails
              });
          });
      });
  });

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
          db.collection('comments').find(query).forEach(function(doc, err) {
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

  module.exports = router;
