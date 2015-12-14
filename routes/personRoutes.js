'use strict';
let express = require('express');
let router = express.Router();
let people = require('../controllers/peopleController');
let expressJWT = require('express-jwt');
const secret = require('../config.js').secret;

router.route('/')
  .all(expressJWT({
    secret: secret
  }))
  .get(people.fetch)
  .put(people.update)
  .post(people.create)
  .delete(people.destroy);

module.exports = router;
