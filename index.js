const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const nunjucks = require('nunjucks');
const sqlite3 = require('sqlite3');
const open = require('sqlite').open;

open({
  filename: './database.sqlite',
  driver: sqlite3.Database
}).then(async db =>{






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

app.get('/articles', async (req, res) => {
  const articles = await db.all('SELECT * FROM articles;');
  res.render('articles.njk', {articles});
});

app.get('/articles/new', (req, res) => {
  res.render('newarticle.njk');
});

app.post('/articles', async (req, res) => {
  await db.run(`INSERT INTO articles (title, body) VALUES ('${req.body.title}', '${req.body.body}');`);
  res.redirect('/articles');
});


app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});

});