const fs = require('fs');
/**
 * @return {String} The content of the read file.
 * @param {String} filePath The path to the file to be read.
 */

module.exports = {
  getContent(filePath, callback) {
    fs.readFile(filePath, 'utf8', (err, data) => {
      try {
        JSON.parse(data);
      } catch (except) {
        except.msg = 'Invalid Data';
        callback(except);
      }
      callback(err, data);
    });
  }
};

/*
,
  isValidJSON(data) {
    console.log('isValidJSON  ' + data);
    try {
      JSON.parse(data);
    } catch (err) {
      return false;
    }
    return true;
  }
  */

