const create = require('./routes/create');
const search = require('./routes/search');


const bodyParser = require('body-parser');
const express = require('express');
const app = express();
require('dotenv').config();




// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/create', create);
app.use('/api/search', search);

console.log(process.env.PORT);
app.listen(process.env.PORT || 3000, () => {

});
module.exports = app;
