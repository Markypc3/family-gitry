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
  self.addRootPersonMode = false;
  self.levelOneCntl = true;
  self.addRootPersonModeDeceasedToggle = false;

  self.hideAllControls = function(){
    self.levelOneCntl = false;
    self.addTreeMode = false;
    self.selectTreeMode = false;
    self.editTreeMetaMode = false;
  }

  self.setLevelOneCntl = function(){
    self.newlyLoggedIn = false;
    self.addTreeMode = false;
    self.selectTreeMode = false;
    self.editTreeMetaMode = false;
    self.addRootPersonMode = false;
    self.addRootPersonModeDeceasedToggle = false;
    Tree.levelOneCntl = self.levelOneCntl = true;
  }

  self.setAddTreeMode = function(){
    self.newlyLoggedIn = false;
    self.addTreeMode = false;
    self.selectTreeMode = false;
    self.editTreeMetaMode = false;
    self.addRootPersonMode = false;
    self.addRootPersonModeDeceasedToggle = false;
    self.addTreeMode = true;
  }

  self.setSelectTreeMode = function(){
    self.newlyLoggedIn = false;
    self.addTreeMode = false;
    self.selectTreeMode = false;
    self.editTreeMetaMode = false;
    self.addRootPersonMode = false;
    self.addRootPersonModeDeceasedToggle = false;
    self.getTrees();
    self.selectTreeMode = true;
  }

  self.setEditTreeMetaMode = function(tree){
    self.newlyLoggedIn = false;
    self.addTreeMode = false;
    self.selectTreeMode = false;
    self.editTreeMetaMode = false;
    self.addRootPersonMode = false;
    self.addRootPersonModeDeceasedToggle = false;
    self.editTreeMetaMode = true;
    Tree.currentTree = self.currentTree = tree;
  }

  self.setAddRootPersonMode = function(){
    self.newlyLoggedIn = false;
    self.addTreeMode = false;
    self.selectTreeMode = false;
    self.editTreeMetaMode = false;
    self.addRootPersonMode = false;
    self.addRootPersonModeDeceasedToggle = false;
    self.addRootPersonMode = true;
  }

  self.setEditTreeMode = function(tree){
    self.newlyLoggedIn = false;
    self.addTreeMode = false;
    self.selectTreeMode = false;
    self.editTreeMetaMode = false;
    self.addRootPersonMode = false;
    self.addRootPersonModeDeceasedToggle = false;
    Person.currentPerson._id = self.currentTree.rootPersonId;
    Person.newlyViewingPeople = true;
  }
  self.currentPersonIsSet = function(){
    return Person.currentPerson._id != '';
  }
  self.loggedin = function(){
    if (User.token == '') {
      return false;
    }
    if (Tree.newlyLoggedIn == true) {
      self.levelOneCntl = true;
      Tree.newlyLoggedIn = false;
    }
    return true;
  }

  self.isCurrentTreeSelected = function(){
    return Object.keys(Tree.currentTree).length > 0
  }
  self.getTrees = function(){
    let treeQuery = {ownerId: User.currentUser._id};
    $http.get('/trees', treeQuery).then(function(data){
      self.trees = data.data;
      console.log(self.trees)
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
    console.log('called updateTree');
    $http.put('/trees', self.currentTree).then(function(data){
      console.log(data);
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
