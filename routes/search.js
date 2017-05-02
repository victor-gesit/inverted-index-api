const express = require('express');
const InvertedIndex = require('../src/inverted-index');
const async = require('async');

const router = express.Router();

const invertedIndex = new InvertedIndex();

router.post('/', (req, res) => {
  const index = req.body.index,
    terms = req.body.terms;
    // fileName = req.body.fileName;
  let searchResults = {};

  async.series([
    (callback) => {
      searchResults = invertedIndex.searchIndex(index, 'book1.json', ...terms);
      callback(null);
    },
    () => {
      res.send(searchResults);
    }
  ]);
});

router.get('/', (req, res) => {
  res.send('Search get route working');
});
module.exports = router;
