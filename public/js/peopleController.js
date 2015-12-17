'use strict';

function peopleController($http, User, Tree, Person){
  self.currentPerson = {};
  self.newlyViewingPeople = Person.newlyViewingPeople;
  self.viewPersonMode = false;

  self.hideAllControls = function(){
    self.viewPersonMode = false;
  }

  self.setViewPersonMode = function(person){
    Person.currentPerson = self.currentPerson = person;
    self.viewPersonMode = true;
  }

  self.setControlsActive = function(){
    if(Person.newlyViewingPeople == true && Person.currentPerson._id != null){
      $http.get('/people', Person.currentPerson).then(function(data){
        self.setViewPersonMode(data.data);
      })
    }
  }
}
