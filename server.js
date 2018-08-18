var express = require('express');
var exphbs  = require('express-handlebars');
var path = require('path');

var app = express();

app.use(express.static('public'))

app.engine('handlebars', exphbs({defaultLayout: 'main',
helpers: {
    section: function(name, options) { 
      if (!this._sections) this._sections = {};
        this._sections[name] = options.fn(this); 
        return null;
      }
  }  
}));


app.set('view engine', 'handlebars');



app.get('/', function(req, res) {
    res.render('home');
});

app.get('/private-motor-yacht-charter', function(req, res) {
    res.render('private-motor-yacht-charter');
});

app.get('/private-boat-catamaran', function(req, res) {
    res.render('private-boat-catamaran');
});

app.get('/private-tours-by-speed-boat', function(req, res) {
    res.render('private-tours-by-speed-boat');
});

app.get('/private-tours-junk-boat', function(req, res) {
    res.render('private-tours-junk-boat');
});

app.get('/destinations', function(req, res) {
    res.render('destinations');
});

app.get('/contact-us', function(req, res) {
    res.render('contact');
});


app.listen(3000);
