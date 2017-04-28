const express = require('express');
const fileHandler = require('../src/fileHandler');
const fs = require('fs');

const router = express.Router();
const InvertedIndex = require('../src/inverted-index');

const invertedIndex = new InvertedIndex();

router.post('/', (req, res) => {
  fileHandler.getContent('fixtures/book1.json', (err, content) => {
    const index = invertedIndex.createIndex('First Book', content);
    res.send('Hello' + index);
  });
});

router.get('/', (req, res) => {
  res.send('Get method working for create route')
});
module.exports = router;
