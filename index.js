const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const nunjucks = require('nunjucks');

nunjucks.configure('views', {
  autoescape: true,
  express: app
});

app.use(express.urlencoded({extended:true}));

app.get('/', (req, res) => { 
  res.render('index.njk');
});

app.get('/page', (req, res) => { 
  res.render('page.njk', {page: req.query.p});
});

app.post('/greeting', (req, res) => {
  console.log(req.body);
  console.log(req.query);
   res.render('greeting.njk',{
     name: req.body.name,
     age: req.body.age});
 });


app.get('/about', (req, res) => {
  res.render('about.njk');
});

app.get('/contact', (req, res) => {
  res.render('contact.njk');
});

app.get('/gallery', (req, res) => {
  res.render('gallery.njk');
});

app.get('/values', (req, res) => {
  res.render('values.njk');
});


app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});