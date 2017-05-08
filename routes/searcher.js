import async from 'async';
import validateAnIndex from '../src/validate-index';
import InvertedIndex from '../src/inverted-index';

const invertedIndex = new InvertedIndex();
const validateIndex = validateAnIndex.validateIndex;
export default {
  appendResult(req, res, next) {
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
      res.searchResult = results[1];
      next();
      // res.send(results[1]);
    });
  }
};
