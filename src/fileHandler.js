const fs = require('fs');
/**
 * @return {String} The content of the read file.
 * @param {String} filePath The path to the file to be read.
 */

module.exports = {
  getContent(filePath) {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        return 'Error reading file';
      }
      console.log('get content ' + data);
      return data;
    });
  },
  isValidJSON(data) {
    console.log('isValidJSON  ' + data);
    try {
      JSON.parse(data);
    } catch (err) {
      return false;
    }
    return true;
  }
};


