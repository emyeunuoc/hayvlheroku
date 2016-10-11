var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var Sequelize = require('sequelize');
var fs = require('fs');

var index = require('./routes/index');
var admin = require('./routes/admin');
var configDb = require('./config/database');

var app = express();
var port = process.env.PORT || 3000;

global.countView = 0;
global.db = new Sequelize(configDb.database, configDb.username, configDb.password, configDb);
db['user'] = db.import(__dirname + '/model/user');
db['post'] = db.import(__dirname + '/model/post');
db['category'] = db.import(__dirname + '/model/category');

db['post'].belongsTo(db['user'], {foreignKey:'userId'});
db['user'].hasMany(db['post'], {foreignKey:'userId'});
db['post'].belongsTo(db['category'], {foreignKey:'categoryId'});
db['category'].hasMany(db['post'],{foreignKey:'categoryId'});
//Body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//seo
app.use(require('prerender-node').set('prerenderToken', 'iyctXSJ4wLmfQxqzN0L4'));
//setting static
app.use(express.static('public'));
app.use('/',index);
app.use('/api', admin);
app.all('/*', function(req, res, next) {
   // Just send the index.html for other files to support HTML5Mode
   res.sendFile('index.html', { root: __dirname + '/public' });
});
app.listen(port, function () {
   console.log('Server started at ', port);
});