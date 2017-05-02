'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _create = require('./routes/create');

var _create2 = _interopRequireDefault(_create);

var _search = require('./routes/search');

var _search2 = _interopRequireDefault(_search);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// const bodyParser = require('body-parser');
// const express = require('express');
// const create = require('./routes/create');
// const search = require('./routes/search');

var app = (0, _express2.default)();
require('dotenv').config({ path: '.env.example' });

// Set port


// Middlewares
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: false }));

app.use('/api/create', _create2.default);
app.use('/api/search', _search2.default);

var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('listening at port ' + port);
});
module.exports = app;