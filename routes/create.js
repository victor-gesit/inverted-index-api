const express = require('express');
const fileHandler = require('../src/file-handler');

const router = express.Router();
const InvertedIndex = require('../src/inverted-index');

const invertedIndex = new InvertedIndex();

router.post('/', (req, res) => {
  fileHandler.getContent('fixtures/book2.json', (err, content) => {
    if(err){
      return res.send('Error: malformed JSON');
    }
    if(Object.keys(req.body).length === 0){
      return res.send('Error: empty message body');
    }
    /*
    if(req.body.constructor === Object && Object.keys(req.body).length === 0) {
      return res.send('Error: Empty Message Body');
    }*/

    console.log('req.body: ' + Object.keys(req.body).length);
    invertedIndex.createIndex('First Book', content, (index) => {
      res.send(index);
    });
  });
});

router.get('/', (req, res) => {
  res.send('Get method working for create route')
});
module.exports = router;
