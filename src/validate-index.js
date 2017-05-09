/**
 * @return {boolean} stating whether supplied index is valid or not
 * This method checks to see if a supplied index is valid
 * @param {Object} index index object to be validated
 */
function validateIndex(index) {
  let validIndex = true;
    // Validate index
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
  return validIndex;
}


export default {
  validateIndex(index, terms, fileName, callback) {
    let indexIsValid = false;
    let indexObject = {};
    if (index === undefined) {
      indexObject = undefined;
    }
    // Handle various query types
    if (typeof index !== 'object' && index !== undefined) {
      try {
        indexObject = JSON.parse(index);
        indexIsValid = validateIndex(indexObject);
      } catch (err) {
        callback(false, { error: 'invalid index supplied' });
      }
    } else if (index !== undefined) {
      indexIsValid = validateIndex(index);
      indexObject = index;
    } else
    if (!indexIsValid) {
      callback(false, { error: 'invalid index supplied' });
    } else
    // Check that terms to search are specified
    if (terms === undefined) {
      callback(false, { error: 'no search terms specified' });
    } else
    // Check that fileName has json extension
    if (fileName !== undefined && (fileName.split('.').pop().toUpperCase() !== 'JSON')) {
      callback(false, { error: 'specify correct file name and extension' });
    } else {
      callback(true, indexObject);
    }
    callback(true, indexObject);
  }
};
