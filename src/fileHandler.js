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
        return callback(except, null);
      }
      let aa = JSON.parse(data);
      return callback(null, JSON.parse(data));
    });
  }
};

/*
function getContent(filePath, callback){
    fs.readFile(filePath, 'utf8', (err, data) => {
      try {
        JSON.parse(data);
      } catch (except) {
        except.msg = 'Invalid Data';
        return callback(except);
      }
      return callback(null, data);
    });
}
*/
//module.exports = getContent;
