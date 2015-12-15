'use strict';
let mongoose = require('mongoose');

let personSchema = mongoose.Schema({
  userId: {type: ObjectId, unique: true},
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
          type: ObjectId, required: true, unique: true
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
        }
        dateOfMarriage: Date,
        dateOfMarriageTerminated: Date,
      }
    ]
  },
  children: {
    type: [
      {
        childId: {
          type: ObjectId, required: true, unique: true
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
          type: ObjectId, required: true, unique: true
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

module.exports = mongoose.model('Person', personSchema);
