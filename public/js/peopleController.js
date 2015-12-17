'use strict';

function peopleController($http, User, Tree, Person){
  self.currentPerson = {};
  self.spousePerson = {};
  self.parentPerson = {};
  self.spousePerson = {};
  self.newlyViewingPeople = Person.newlyViewingPeople;
  self.viewPersonMode = false;
  self.addChildMode = false;
  self.editPersonMode = false;
  self.addParentMode = false;
  self.addSpouseMode = false;

  self.hideAllControls = function(){
    self.viewPersonMode = false;
    self.addChildMode = false;
    self.editPersonMode = false;
    self.addParentMode = false;
    self.addSpouseMode = false;

  }

  self.setViewPersonMode = function(person){
    Person.currentPerson = self.currentPerson = person;
    self.hideAllControls();
    self.viewPersonMode = true;
  }

  self.setAddChildMode = function(){
    self.hideAllControls();
    self.addChildMode = true;
  }

  self.setEditPersonMode = function(){
    self.hideAllControls();
    self.editPersonMode = true;
  }

  self.setAddParentMode = function(){
    self.hideAllControls();
    self.addParentMode = true;
  }

  self.setAddSpouseMode = function(){
    self.hideAllControls();
    self.addSpouseMode = true;
  }

  self.setControlsActive = function(){
    if(Person.newlyViewingPeople == true && Person.currentPerson._id != null){
      $http.get('/people', Person.currentPerson).then(function(data){
        self.setViewPersonMode(data.data);
      })
    }
  }

  self.selectPerson = function(personId){
    if(personId != null){
      $http.get('/people', {_id: personId}).then(function(person){
        self.setViewPersonMode(person);
      });
    }
  }

  self.createPerson = function(person){
    $http.post('/people', person).then(function(data){
      return data.data;
    })
  }

  self.updatePerson = function(person){
    $http.put('/people', person).then(function(data){
      return data.data;
    })
  }

  self.addChild = function(){
    self.childPerson.parents =[];
    self.childPerson.parents.push({
      parentId: self.currentPerson._id,
      firstName: self.currentPerson.firstName,
      middleName: self.currentPerson.middleName,
      lastName: self.currentPerson.lastName,
      gender: self.currentPerson.gender,
      dateOfBirth: self.currentPerson.dateOfBirth,
      dateOfDeath: self.currentPerson.dateOfDeath
    });
    for(let i = 0 ; i < self.currentPerson.spouse.length ; i++){
      self.childPerson.parents.push({
        parentId: self.currentPerson.spouse[i].spouseId,
        firstName: self.currentPerson.spouse[i].firstName,
        middleName: self.currentPerson.spouse[i].middleName,
        lastName: self.currentPerson.spouse[i].lastName,
        gender: self.currentPerson.spouse[i].gender,
        dateOfBirth: self.currentPerson.spouse[i].dateOfBirth,
        dateOfDeath: self.currentPerson.spouse[i].dateOfDeath
      });
    }
    let child = self.createPerson(self.childPerson);
    if(self.currentPerson.children == null){
      self.currentPerson.children = [];
    }
    self.currentPerson.children.push({
      childId: child._id,
      firstName: child.firstName,
      middleName: child.middleName,
      lastName: child.lastName,
      gender: child.gender,
      dateOfBirth: child.dateOfBirth,
      dateOfDeath: child.dateOfDeath
    });
    Person.currentPerson = self.updatePerson(self.currentPerson);
    self.setViewPersonMode(self.currentPerson);
  }

  self.addSpouse = function(){
    self.spousePerson.spouse =[];
    self.spousePerson.spouse.push({
      spouseId: self.currentPerson._id,
      firstName: self.currentPerson.firstName,
      middleName: self.currentPerson.middleName,
      lastName: self.currentPerson.lastName,
      gender: self.currentPerson.gender,
      dateOfBirth: self.currentPerson.dateOfBirth,
      dateOfDeath: self.currentPerson.dateOfDeath
    });
    let spouse = self.createPerson(self.spousePerson);
    if(self.currentPerson.spouse == null){
      self.currentPerson.spouse = [];
    }
    self.currentPerson.spouse.push({
      spouseId: spouse._id,
      firstName: spouse.firstName,
      middleName: spouse.middleName,
      lastName: spouse.lastName,
      gender: spouse.gender,
      dateOfBirth: spouse.dateOfBirth,
      dateOfDeath: spouse.dateOfDeath
    });
    Person.currentPerson = self.updatePerson(self.currentPerson);
    self.setViewPersonMode(self.currentPerson);
  }

  self.addParent = function(){
    self.parentPerson.children =[];
    self.parentPerson.children.push({
      childId: self.currentPerson._id,
      firstName: self.currentPerson.firstName,
      middleName: self.currentPerson.middleName,
      lastName: self.currentPerson.lastName,
      gender: self.currentPerson.gender,
      dateOfBirth: self.currentPerson.dateOfBirth,
      dateOfDeath: self.currentPerson.dateOfDeath
    });
    for(let i = 0 ; i < self.currentPerson.parents.length ; i++){
      self.parentPerson.spouse.push({
        spouseId: self.currentPerson.parents[i].parentId,
        firstName: self.currentPerson.parents[i].firstName,
        middleName: self.currentPerson.parents[i].middleName,
        lastName: self.currentPerson.parents[i].lastName,
        gender: self.currentPerson.parents[i].gender,
        dateOfBirth: self.currentPerson.parents[i].dateOfBirth,
        dateOfDeath: self.currentPerson.parents[i].dateOfDeath
      });
    }
    let parent = self.createPerson(self.parentPerson);
    if(self.currentPerson.parents == null){
      self.currentPerson.parents = [];
    }
    self.currentPerson.parents.push({
      parentId: parent._id,
      firstName: parent.firstName,
      middleName: parent.middleName,
      lastName: parent.lastName,
      gender: parent.gender,
      dateOfBirth: parent.dateOfBirth,
      dateOfDeath: parent.dateOfDeath
    });
    Person.currentPerson = self.updatePerson(self.currentPerson);
    self.setViewPersonMode(self.currentPerson);
  }
}
