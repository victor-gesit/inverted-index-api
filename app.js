require('dotenv').config();
const InvertedIndex = require('./src/inverted-index');
const bodyParser = require('body-parser');

const express = require('express');

const app = express();

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/api/create', (req, res) => {
  console.log(req);
  res.send('body ' + req.body[0].title);
});

app.post('/api/search', (req, res) => {
  res.send('post endpoint for api search');
});

app.get('/', (req, res) => {
  res.send('default get endpoint');
});

app.listen(8000, () => {
});
