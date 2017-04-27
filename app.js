const bodyParser = require('body-parser');
const express = require('express');

const create = require('./routes/create');
const search = require('./routes/search');

const app = express();
require('dotenv').config();



// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/create', create);
app.use('/api/search', search);

const port = process.env.port || 3000;
app.listen(port, () => {
  console.log('listening at port ' + port);
});
module.exports = app;
