import express from 'express';
import async from 'async';
import InvertedIndex from '../src/inverted-index';

// const express = require('express');
// const InvertedIndex = require('../src/inverted-index');
// const async = require('async');
const router = express.Router();

router.post('/', (req, res) => {
  const index = req.body.index,
    terms = req.body.terms;
    // fileName = req.body.fileName;
  let searchResults = {};

  async.series([
    (callback) => {
      searchResults = InvertedIndex.searchIndex(index, 'book1.json', ...terms);
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
