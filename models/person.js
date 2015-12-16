'use strict';
let mongoose = require('mongoose');

let personSchema = new mongoose.Schema({
  userId: {type: mongoose.Schema.Types.ObjectId, unique: true},
  firstName: String,
  middleName: String,
  lastName: String,
  email: String,
  gender: String,
  dateOfBirth: Date,
  dateOfDeath: Date,
  interests: String,
  bio: String,
  imageUrls: [
    { url: String, dateTaken: Date }
  ],
  created_at: {type: Date, default: Date.now, required: true},
  updated_at: {type: Date, default: Date.now, required: true},
  spouse: {
    type: [
      {
        spouseId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          unique: true
        },
        firstName: String,
        middleName: String,
        lastName: String,
        gender: String,
        dateOfBirth: Date,
        dateOfDeath: Date,
        typeOfAssociation: {
          type: String,
          default: 'marriage'
        },
        dateOfMarriage: Date,
        dateOfMarriageTerminated: Date,
      }
    ]
  },
  children: {
    type: [
      {
        childId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          unique: true
        },
        firstName: String,
        middleName: String,
        lastName: String,
        gender: String,
        dateOfBirth: Date,
        dateOfDeath: Date,

      }
    ]
  },
  parents: {
    type: [
      {
        parentId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          unique: true
        },
        firstName: String,
        middleName: String,
        lastName: String,
        gender: String,
        dateOfBirth: Date,
        dateOfDeath: Date,
        typeOfRelation: {
          type: String,
          default: 'blood'
        }
      }
    ]
  }
});

personSchema.pre('save', function(next){
  let person = this;
  person.updated_at = Date.now;
  next();
})

module.exports = mongoose.model('Person', personSchema);
