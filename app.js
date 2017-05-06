import express from 'express';
import create from './routes/create';
import search from './routes/search';

const app = express();
require('dotenv').config();

// Set port
switch (process.env.NODE_ENV) {
  case 'TEST': app.set('PORT', process.env.PORT_TEST); break;
  case 'PROD': app.set('PORT', process.env.PORT_PROD); break;
  case 'DEV': app.set('PORT', process.env.PORT_DEV); break;
  default: app.set('PORT', 5000);
}

// Routes
app.use('/api/create', create);
app.use('/api/search', search);

// Default response for incorrect routes
app.use('/', (req, res) => {
  res.send('App Running...\nUse /api/create and /api/search to create and search indices');
});

const port = app.get('PORT');
app.listen(port, () => {
  console.log(`listening at port ${port}`);
});

module.exports = app; // Make app available to the test suite;
