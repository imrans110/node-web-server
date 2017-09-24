const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

var app = express();


hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n');
  next();
});

// app.use((req, res, next) => {
// res.render('maintainance.hbs');
//
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('currentYear', () => {
return new Date().getFullYear()
});

hbs.registerHelper('scream', (text) => {
  return text.toUpperCase();
});


app.get('/bad', (req, res) => {
  res.send({
    code: 404,
    title: "JSON File returned with error"
  });
});

app.get('/', (req, res) =>{
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcome: 'Welcome user 251'
  });
});


app.get('/about', (req, res) => {
  res.render('about.hbs',{
    pageTitle: 'About Page'
  });
});


app.listen(port, () => {
  console.log(`server is up and running at ${port}`);
});
