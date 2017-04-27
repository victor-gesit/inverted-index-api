const express = require('express');
const fileHandler = require('../src/fileHandler');

const router = express.Router();

router.post('/', (req, res) => {
  const body = fileHandler.getContent('fixtures/book1.json');
  console.log('body: ' + body);
  const data = JSON.stringify(body);
  res.send(fileHandler.isValidJSON(body));
});

router.get('/', (req, res) => {
  res.send('Get method working for create route')
});
module.exports = router;
