const express = require('express');
const fileHandler = require('../src/fileHandler');

const router = express.Router();

router.post('/', (req, res) => {
  const body = fileHandler.getContent('fixtures/book1.json');
  const data = JSON.stringify(body);
});

router.get('/', (req, res) => {
  res.send('Get method working for create route')
});
module.exports = router;
