import express from 'express';
import async from 'async';
import bodyParser from 'body-parser';
import InvertedIndex from '../src/inverted-index';

const router = express.Router();

// Middle wares
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

const invertedIndex = new InvertedIndex();
router.post('/', (req, res) => {
  let searchResults = {};
  const index = req.body.index,
    terms = req.body.terms,
    fileName = req.body.fileName;
  const indexObject = JSON.parse(index);
  async.series([
    (callback) => {
      if (fileName === undefined || fileName.length === 0) {
        searchResults = invertedIndex.searchIndex(indexObject, terms);
      } else {
        searchResults = invertedIndex.searchIndex(indexObject, fileName, terms);
      }
      callback(null);
    },
    () => {
      res.send(searchResults);
    }
  ]);
});

module.exports = router;
