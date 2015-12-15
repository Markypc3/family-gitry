'use strict';

let jwt = require('jsonwebtoken');
let User = require('../models/user');
const secret = require('../config.js').secret;

function create(req, res){
  let newUser = new User(req.body);

  newUser.save(function(err){
    if(err)
      res.status(401).send(err);
    } else {
      res.status(200).send({token: jwt.sign(newUser, secret), currentUser: newUser})
    }
  });
}

function fetch(req, res){
  User.find({}, function(err, users){
    if(err) res.send(err);
    res.send(users);
  })
}
