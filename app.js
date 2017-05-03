import express from 'express';
import bodyParser from 'body-parser';
import create from './routes/create';
import search from './routes/search';

// const bodyParser = require('body-parser');
// const express = require('express');
// const create = require('./routes/create');
// const search = require('./routes/search');

const app = express();
require('dotenv').config();

// Set port

switch (process.env.NODE_ENV) {
  case 'TEST': app.set('PORT', process.env.PORT_TEST); break;
  case 'PROD': app.set('PORT', process.env.PORT_PROD); break;
  case 'DEV': app.set('PORT', process.env.PORT_DEV); break;
  default: app.set('PORT', 5000);
}

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/create', create);
app.use('/api/search', search);

const port = app.get('PORT');
app.listen(port, () => {
  console.log(`listening at port ${port}`);
});
module.exports = app;
