'use strict';
let mongoose = require('mongoose');

let treeSchema = mongoose.Schema({
  ownerId: ObjectId,
  rootPersonId: ObjectId,
  title: String,
  description: String
});

module.exports = mongoose.model('Tree', treeSchema);
