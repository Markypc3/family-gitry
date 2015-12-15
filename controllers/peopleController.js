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
  Person.find({}, function(err, people){
    if(err) res.send(err);
    res.send(people);
  })
}
