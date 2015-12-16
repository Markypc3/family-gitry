'use strict';
let express = require('express');
let trees = require('../controllers/treesController');
let router = express.router();
let expressJWT = require('express-jwt');
const secret = require('../config.js').secret;


router.route('/')
  .all(expressJWT({
    secret: secret
  }))
  .get(trees.fetch)
  .post(trees.create)
  .put(trees.update)
  .delete(trees.delete);


module.exports = router;
