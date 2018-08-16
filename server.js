var express = require('express');
var exphbs  = require('express-handlebars');
var path = require('path');

var app = express();

app.use(express.static('public'))

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


app.get('/', function(req, res) {
    res.render('home');
});

app.get('/private-boat-catamaran')

app.listen(3000);