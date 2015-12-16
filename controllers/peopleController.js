'use strict';

let Person = require('../models/person');

function create(req, res){
  let newPerson = new Person(req.body);

  newPerson.save(function(err, newPerson){
    if(err)
      res.status(401).send(err);
    } else {
      res.status(200).send(newPerson)
    }
  });
}
function fetch(req, res){
  Person.findOne({_id: req.body.id}, function(err, person){
    if(err) res.send(err);
    res.send(person);
  });
}
function fetchAll(req, res){
  Person.find({}, function(err, people){
    if(err) res.send(err);
    res.send(people);
  })
}

function fetchPeople(req, res){
  Person.find({_id: {$in: req.body.ids}}, function(err, people){
    if(err) res.send(err);
    res.send(people);
  })
}

function update(req, res){
  let personParams = req.body.person;
  Person.findOne({_id: personParams.id}, function(err, person){
    if(err) {res.send(err);}
    person = personParams;
    person.save(function(err, person){
      if(err) {res.send(err);}
      res.send(person);
    });
  });
}

function destroy(req, res) {
  let personParams = req.body.person;
  Person.findOne({ _id: personParams.id }, function(err, person) {
    if(err) { res.send(err); }
    person.remove(function(err, person){
      if(err) { res.send(err); }
      res.send({ 'record': 'deleted', 'person': person });
    });
  });
}

module.exports = {
  create: create,
  fetch: fetch,
  fetchAll: fetchAll,
  fetchPeople: fetchPeople,
  update: update,
  destroy: destroy
}
