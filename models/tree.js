'use strict';
let mongoose = require('mongoose');

let treeSchema = new mongoose.Schema({
  ownerId: mongoose.Schema.Types.ObjectId,
  rootPersonId: mongoose.Schema.Types.ObjectId,
  title: String,
  description: String,
  created_at: {type: Date, default: Date.now, required: true},
  updated_at: {type: Date, default: Date.now, required: true}
});

treeSchema.pre('save', function(next){
  let tree = this;
  tree.updated_at = Date.now;
  next();
})

module.exports = mongoose.model('Tree', treeSchema);
