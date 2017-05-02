import fs from 'fs';
// const fs = require('fs');
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
        return callback(except, null);
      }
      const parsed = JSON.parse(data);
      return callback(null, parsed);
    });
  },
  getIndex(fileName, callback) {
    fs.readFile(`indices/${fileName}`, 'utf8', (err, data) => {
      if (err) {
        return callback(err, null);
      }
      return callback(null, data);
    });
  }
};
