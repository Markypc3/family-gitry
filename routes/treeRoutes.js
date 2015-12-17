'use strict';
let express = require('express');
let trees = require('../controllers/treesController');
let router = express.Router();
let expressJWT = require('express-jwt');
const secret = require('../config.js').secret;


router.route('/')
  .all(expressJWT({
    secret: secret
  }))
  .get(trees.fetchByOwner)
  .post(trees.create)
  .put(trees.update)
  .delete(trees.destroy);
router.route('/fetch')
  .all(expressJWT({
    secret: secret
  }))
  .get(trees.fetchOne);

module.exports = router;
