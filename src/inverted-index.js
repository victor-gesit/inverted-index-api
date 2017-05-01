const filter = require('./content-filter');
const makeIndex = require('./make-index').makeIndex;
/**
 * Implementing the Inverted Index search procedure
 */
class InvertedIndex {
  /**
   * @return {Object} index of supplied document
   * @param {string} fileName The name of the file whose index is to be created
   * @param {string} fileContent The content of the file
   * @param {function} done A callback, whose argument is the returned index
   */
  createIndex(fileName, fileContent, done) {
    filter.contentFilter(fileContent, (filteredDocument) => {
      makeIndex(filteredDocument, index => done(index));
    });
  }
  /**
   * @return {Array} find
   * @param {*} index
   * @param {*} fileName
   * @param {*} terms
   */
  static searchIndex(index, fileName, ...terms) {

  }
}

module.exports = InvertedIndex;
