require('dotenv').config();
const express = require('express');

const app = express();

app.post('/api/create', (req, res, next) => {
  res.send('post endpoint for api create');
});

app.post('/api/search', (req, res, next) => {
  res.send('post endpoint for api search');
});
/**
 * Implementing the Inverted Index search procedure
 */
class InvertedIndex {

}