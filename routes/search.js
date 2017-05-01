const express = require('express');
const invertedIndex = require('../src/inverted-index');

const router = express.Router();

router.post('/', (req, res) => {
  res.send('Search post route working');
});

router.get('/', (req, res) => {
  res.send('Search get route working');
});
module.exports = router;
