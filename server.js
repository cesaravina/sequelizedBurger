// Dependencies

var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

// Requiring our models for syncing
var db = require("./models");

var PORT = process.env.PORT || 8080;

var app = express();

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: false }));

// Static directory
app.use(express.static(process.cwd() + '/public'));

app.use(methodOverride('_method'));

// Handlebars setup
var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

var routes = require('./controllers/burger_controller.js');

app.use('/', routes);
// Syncing our sequelize models and then starting our express app
db.sequelize.sync({ force: false }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});