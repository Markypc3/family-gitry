'use strict';

let Tree = require('../models/tree');

function create(req, res){
  let newTree = new Tree(req.body.tree);

  newTree.save(function(err){
    if(err){
      res.status(401).send(err);
    } else {
      res.status(200).send()
    }
  });
}

function fetchByOwner(req, res){
  Tree.find({ownerId: req.body.ownerId}, function(err, trees){
    if(err) res.send(err);
    res.send(trees);
  });
}

function fetchOne(req, res){
  Tree.find({_id: req.body.id}, function(err, tree){
    if (err) {
      return res.send(err);
    }
    res.send(tree);
  });
}

function update(req, res) {
  Tree.findOne({_id: req.body._id}, function(err, tree){
    tree.rootPersonId = req.body.rootPersonId;
    tree.title = req.body.title;
    tree.description = req.body.description;
    tree.save(function(err, tree){
      if(err) res.send(err);
      res.send(tree);
    });
  });
}
function destroy(req, res){
  let treeParams = req.body;
  Tree.findOne({ _id : treeParams._id }, function(err, tree){
    if (err) { res.send(err) }
    tree.remove(function (err, tree) {
      if (err) { res.send(err); }
      res.send({ "record" : "deleted", 'tree': tree });
    });
  });
}
module.exports = {
  create: create,
  fetchByOwner: fetchByOwner,
  fetchOne: fetchOne,
  update: update,
  destroy: destroy
}
