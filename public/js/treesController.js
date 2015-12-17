'use strict';

function treesController($http, User, Tree, Person) {
  self = this;
  self.newTree = {};
  self.currentTree = {};
  self.rootPerson = {};
  self.trees = [];
  self.newlyLoggedIn = false;
  self.addTreeMode = false;
  self.selectTreeMode = false;
  self.editTreeMetaMode = false;
  self.levelOneCntl = false;
  self.addRootPersonModeDeceasedToggle = false;

  self.hideAllControls = function(){
    self.levelOneCntl = false;
    self.addTreeMode = false;
    self.selectTreeMode = false;
    self.editTreeMetaMode = false;
  }

  self.setLevelOneCntl = function(){
    self.hideAllControls();
    self.levelOneCntl = true;
  }

  self.setAddTreeMode = function(){
    self.hideAllControls();
    self.addTreeMode = true;
  }

  self.setSelectTreeMode = function(){
    self.hideAllControls();
    self.getTrees();
    self.selectTreeMode = true;
  }

  self.setEditTreeMetaMode = function(tree){
    self.hideAllControls();
    self.editTreeMetaMode = true;
    self.currentTree = tree;
    Tree.currentTree = self.currentTree;
  }

  self.setEditTreeMode = function(tree){
    self.hideAllControls();
    Person.currentPerson._id = self.currentTree.rootPersonId;
    Person.newlyViewingPeople = true;
  }

  self.setControlsActive = function(){
    if (Tree.newlyLoggedIn == true) {
      self.setLevelOneCntl();
      Tree.newlyLoggedIn = false;
    }
  }
  self.loggedin = function(){
    if (User.token == '') {
      return false;
    }
    return true;
  }

  self.getTrees = function(){
    let treeQuery = {ownerId: User.currentUser._id};
    $http.get('/trees', treeQuery).then(function(data){
      self.trees = data.data;
    });
  }

  self.createTree = function(){
    self.newTree.ownerId = User.currentUser._id;
    $http.post('/trees', self.newTree).then(function(data){
      self.trees.push(data.data);
      self.setEditTreeMode(data.data);
    })
  }

  self.updateTree = function(){
    $http.put('/trees', self.currentTree).then(function(data){
      self.currentTree = data.data;
      Tree.currentTree = self.currentTree;
    });
  }

  self.updateRootPerson = function(tree){
    $http.post('/people', self.rootPerson).then(function(person){
      self.currentTree.rootPersonId = person.data._id;
      self.updateTree();
    });
  }

}
