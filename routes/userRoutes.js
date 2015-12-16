'use strict';
let express = require('express');
let router = express.Router();
let user = require('../controllers/usersController.js');
let expressJWT = require('express-jwt');
const secret = require('../config.js').secret;

router.route('/')
  .all(expressJWT({
    secret: secret  //,
                    //    userProperty: 'auth' //This was in cort's code, not sure why yet
  }))
  .get(user.fetchAll)
  .put(user.update)
  .delete(user.destroy);

router.route('/:id')
  .all(expressJWT({
    secret: secret
  }))
  .get(user.show);

router.route('/auth')
  .post(user.auth);

router.route('/signup')
  .post(user.create);

router.route('logout')
  .get(user.logout);

module.exports = router;
