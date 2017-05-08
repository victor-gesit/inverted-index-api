export default {
  validateIndex(index, terms, fileName, callback) {
    // console.log(index);
    let indexObject = {};
  // Validate index
    if (typeof index !== 'object') {
      try {
        indexObject = JSON.parse(index);
      } catch (err) {
        callback(false, { error: 'invalid index' });
      }
    } else {
      indexObject = index;
    }
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
  }
};
