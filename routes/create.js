import express from 'express';
import fileHandler from '../src/file-handler';

// const express = require('express');
// const fileHandler = require('../src/file-handler');

const router = express.Router();
const InvertedIndex = require('../src/inverted-index');

router.post('/', (req, res) => {
  fileHandler.getContent('fixtures/book2.json', (err, /* content*/) => {
    if (err) {
      return res.send({ error: 'malformed json' });
    }
    if (Object.keys(req.body).length === 0) {
      return res.send({ error: 'empty file' });
    }
    InvertedIndex.createIndex('book1.json', req.body, (indices) => {
      res.send(indices);
    });
  });
});

router.get('/', (req, res) => {
  res.send('Get method working for create route');
});
module.exports = router;
