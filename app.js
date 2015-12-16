'use strict';
let express = require('express');
let logger = require('morgan');
let path = require('path');
let bodyParser = require('body-parser');
// let jwt = require('jsonwebtoken');
let app = express();

//app config
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//app public routes set
app.use('/', express.static(path.join(__dirname, 'public')));
app.use('/d3', express.static(path.join(__dirname, 'node_modules', 'd3')));
app.use('/angular', express.static(path.join(__dirname, 'node_modules', 'angular')));

//app api routes set
let userRoutes = require('./routes/userRoutes');
let treeRoutes = require('./routes/treeRoutes');
let personRoutes = require('./routes/personRoutes');
app.use('/users', userRoutes);
app.use('/trees', treeRoutes);
app.use('/people', personRoutes);

let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/familygitry');
const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error: '));
  db.once('open', function( callback ) {
    console.log('Database is up and Connection has been extablished')
  });

let server = app.listen(3000, function(){
  let host = server.address().address;
  let port = server.address().port;
  console.log('FamilyGitry is Listening at %s on port %d', host, port);
});
