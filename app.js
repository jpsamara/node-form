var express    = require('express');
var path       = require('path');
var bodyParser = require('body-parser');
var swig       = require('swig');
// init app
var app = express();
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// Database
require(__dirname +'/database/init.js')
var preference = require(__dirname +'/database/preference.js');

// View Engine
var swig = new swig.Swig();
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

app.get('/api/preferences', function(req, res) {
  res.send(preference.all())
});

app.get('/api/exist/:fullname', function(req, res) {
  res.send({"exist": preference.isExist(req.params['fullname'])})
});

app.post('/add/preference', function(req, res) {
  // Check if the name has already been submitted 
  if(preference.isExist(req.body.fullname)) {
      res.redirect('/submit/error/' + req.body.fullname)
      return;
  }
  preference.insert(req.body.fullname, req.body.color, req.body.animal);
  res.redirect('/submit/done/' + req.body.fullname)
});

app.get('/preferences', function(req, res) {
  res.render('preferences.html', {'preferences': preference.all()});
});

app.get('/preferences/clear', function(req, res) {
  preference.clear()
  res.render('preferences.html', {'preferences': preference.all()});
});

app.get('/:submit?/:result?/:name?', function(req, res) {
  res.render('index.html', { 
    'submit': req.params['submit'], 
    'result': req.params['result'],
    'name': req.params['name']
  });
});

app.listen(4000, function () {
  console.log('App is now running on port 4000!');
});
