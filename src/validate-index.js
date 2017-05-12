import async from 'async';

/**
 * This method checks to see if a supplied index is valid
 * @return {undefined} This method returns nothing
 * @param {Object} index index object to be validated
 * @param {function} done callback function, takes in boolean
 */
function validateAnIndex(index, done) {
  let validIndex = true;
    // Validate index
  async.series([
    (callback) => {
      Object.keys(index).forEach((fileName) => {
        // Check for files with error
        if (Object.keys(index[fileName])[0] === 'error') {
          return; // This file had an error during index creation
        }
        // Check for files without index key
        if (Object.keys(index[fileName])[0] !== 'index') {
          validIndex = false;
        } else {
          Object.keys((index[fileName].index)).forEach((token) => {
            // check content of token indices
            if (!((index[fileName].index[token]) instanceof Array)) {
              validIndex = false;
            } else {
              (index[fileName].index[token]).forEach((digit) => {
                if ((typeof digit) !== 'number') {
                  validIndex = false;
                }
              });
            }
          });
        }
      });
      callback(null);
    },
    () => done(validIndex)
  ]);
}


export default {
  validateIndex(index, terms, fileName, callback) {
    let indexObject = {};
    if (index === undefined) {
      indexObject = undefined;
    }
    // Check that terms to search are specified
    if (terms === undefined) {
      return callback(false, { error: 'no search terms specified' });
    }
    // Check that fileName has json extension
    if (fileName !== undefined && (fileName.split('.').pop().toUpperCase() !== 'JSON')) {
      return callback(false, { error: 'specify correct file name and extension' });
    }
    // Handle various query types
    if (typeof index !== 'object' && index !== undefined) {
      try {
        indexObject = JSON.parse(index);
      } catch (err) {
        return callback(false, { error: 'invalid index supplied' });
      }
    } else if (index !== undefined) {
      indexObject = index;
    }
    validateAnIndex(indexObject, (isValid) => {
      if (!isValid) {
        return callback(false, { error: 'invalid index supplied' });
      } else {
        return callback(true, indexObject);
      }
    });
  }
};
