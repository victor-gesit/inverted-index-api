import fs from 'fs';

/**
 * @return {String} The content of the read file.
 * @param {String} filePath The path to the file to be read.
 */


module.exports = {
  getContent(filePath, callback) {
    fs.readFile(filePath, 'utf8', (err, data) => {
      fs.unlink(filePath);  // Delete file after reading to save space
      const errorObject = {};
      // Check for empty file
      if (data.length === 0) {
        errorObject.msg = { error: 'empty file' };
        return callback(errorObject, null);
      }
      // Check for malformed file
      try {
        JSON.parse(data);
      } catch (except) {
        errorObject.msg = { error: 'malformed json' };
        return callback(errorObject, null);
      }
      // Check for incorrect document structure
      const parsed = JSON.parse(data);
      if (parsed instanceof Array) {
        parsed.forEach((book) => {
          const hasTwoFields = Object.keys(book).length === 2;
          const hasTitleField = book.hasOwnProperty('title');
          const hasTextField = book.hasOwnProperty('text');
          if (!hasTwoFields || !hasTitleField || !hasTextField) {
            errorObject.msg = { error: 'document structured incorectly' };
            return callback(errorObject, null);
          }
        });
      } else {
        const hasTwoFields = Object.keys(parsed).length === 2;
        const hasTitleField = parsed.hasOwnProperty('title');
        const hasTextField = parsed.hasOwnProperty('text');
        if (!hasTwoFields || !hasTitleField || !hasTextField) {
          errorObject.msg = { error: 'document structured incorectly' };
          return callback(errorObject, null);
        }
      }

      return callback(null, parsed);
    });
  }
};
