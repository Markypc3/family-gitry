'use strict';

let jwt = require('jsonwebtoken');
let User = require('../models/user');
const secret = require('../config.js').secret;

function create(req, res){
  let newUser = new User(req.body);

  newUser.save(function(err){
    if(err){
      console.log(err.toString());
      res.status(401).send(err);
    } else {
      res.status(200).send({token: jwt.sign(newUser, secret), currentUser: newUser})
    }
  });
}

function fetchAll(req, res){
  User.find({}, function(err, users){
    if(err) {
      res.send(err);
    } else {
    res.send(users);
    }
  });
}

function show(req, res){
  User.findOne({ _id: req.params.id }, function(err, user){
    if(err) {
      return res.send(err);
    } else {
      res.send(user);
    }
  })
}

function update(req, res){
  let userParams = req.body.user;
  User.findOne({email: userParams.email }, function(err, user){
    user.firstName = userParams.newFirstName;
    user.lastName = userParams.newLastName;
    user.username = userParams.newUserName
    user.email = userParams.newEmail;
    user.updated_at = Date.now;
    user.save(
      function(err, user){
        if (err) {
          res.send(err);
        } else {
          res.send(user);
        }
      }
    );
  });
}

function destroy(req, res){
  let userParams = req.body.user;
  User.findOne({ email : userParams.email}, function(err, user){
    if (err) { res.send(err) }
    user.remove(function (err, user) {
      if (err) {
        res.send(err);
      } else {
        res.send({ "record" : "deleted", 'user': user });
      }
    });
  });
}

function auth(req, res){
  let userParams = req.body;
  if (userParams.email == undefined || userParams.password == undefined) {
    return res.status(401).send({message: "Incorrect Login Information"});
  }
  User.findOne({ email: userParams.email }, function(err, user) {
    if (user == null) {
      return res.status(401).send({message: "Invalid Credentials"});
    } else {
      user.authenticate(userParams.password, function (err, isMatch) {
        if (err) throw err;
        if (isMatch) {
          return res.status(200).send({message: "Valid Credentials", token: jwt.sign(user, secret), currentUser: user});
        } else {
          return res.status(401).send({message: "Invalid Credentials"});
        }
      });
    }
  });
}

function logout(req, res) {
  console.log(req.headers.token);
  res.status(200).send();
  //remove the token in storage? or allow other browsers to access?
}

module.exports = {
  create: create,
  fetchAll: fetchAll,
  show: show,
  update: update,
  destroy: destroy,
  auth: auth,
  logout: logout
}
