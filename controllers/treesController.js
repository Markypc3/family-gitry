'use strict';

let Tree = require('../models/tree');

function create(req, res){
  let newTree = new Tree(req.body.tree);

  newTree.save(function(err){
    if(err)
      res.status(401).send(err);
    } else {
      res.status(200).send()
    }
  });
}

function fetch(req, res){
  Tree.find({ownerId: req.body.ownerId}, function(err, trees){
    if(err) res.send(err);
    res.send(trees);
  });
}

function update(req, res) {
  Tree.findOne({ownerId: req.body.tree.ownerId}, function(err, tree){
    tree.rootPersonId = req.body.tree.rootPersonId;
    tree.title = req.body.tree.title;
    tree.description = req.body.tree.description;
    tree.save(function(err, tree){
      if(err) res.send(err);
      res.send(tree);
    });
  });
}
function destroy(req, res){
  let treeParams = req.body.tree;
  Tree.findOne({ _id : treeParams.id }, function(err, tree){
    if (err) { res.send(err) }
    tree.remove(function (err, tree) {
      if (err) { res.send(err); }
      res.send({ "record" : "deleted", 'tree': tree });
    });
  });
}
module.exports = {
  create: create,
  fetch: fetch,
  update: update,
  destroy: destroy
}
