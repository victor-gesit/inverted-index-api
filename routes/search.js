import express from 'express';
import async from 'async';
import bodyParser from 'body-parser';
import InvertedIndex from '../src/inverted-index';

const router = express.Router();

// Middlewares
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

const invertedIndex = new InvertedIndex();
router.post('/', (req, res) => {
  let searchResults = {};
  const index = req.body.index,
    terms = req.body.terms,
    fileName = req.body.fileName;
  let indexObject = {};
  // Validate index
  if (typeof index !== 'object') {
    try {
      indexObject = JSON.parse(index);
    } catch (err) {
      console.log('here 0');
      return res.send({ error: 'invalid index' });
    }
  } else {
    indexObject = index;
  }
  // Check that terms to search are specified
  if (terms === undefined) {
    return res.send({ error: 'no terms specified' });
  }
  // Check that fileName has json extension
  if (fileName !== undefined && (fileName.split('.').pop().toUpperCase() !== 'JSON')) {
    return res.send({ error: 'specify correct file name and extension' });
  }
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

export default router;
