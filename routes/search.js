import express from 'express';
import async from 'async';
import bodyParser from 'body-parser';
import InvertedIndex from '../src/inverted-index';
import validateAnIndex from '../src/validate-index';

const validateIndex = validateAnIndex.validateIndex;
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
  async.series([
    (callback) => {
      // Validate the index, terms and fileName supplied
      validateIndex(index, terms, fileName, (isValid, madeObject) => {
        indexObject = madeObject;
        if (isValid) {
          callback(null);
        } else {
          return callback('stop', indexObject);  // Stop execution of other functions in the series
        }
      });
    },
    (callback) => {
      if (fileName === undefined || fileName.length === 0) {
        searchResults = invertedIndex.searchIndex(indexObject, terms);
      } else {
        searchResults = invertedIndex.searchIndex(indexObject, fileName, terms);
      }
      callback(null, searchResults);
    }
  ],
  (err, results) => {
    res.send(results[1]);
  });
});

export default router;
