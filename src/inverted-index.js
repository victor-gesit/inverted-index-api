const filter = require('./contentFilter');
const makeIndex = require('./make-index').makeIndex;
/**
 * Implementing the Inverted Index search procedure
 */
class InvertedIndex {
  /**
   * @return {Object} index of supplied document
   * @param {*} fileName
   * @param {*} fileContent
   */
  createIndex(fileName, fileContent, done) {
    filter.contentFilter(fileContent, (filteredDocument) => {
      makeIndex(filteredDocument, (index) => {
        console.log(index);
        return done(index);
      });
    });
  }
  /**
   * @return {Array} find
   * @param {*} index
   * @param {*} fileName
   * @param {*} terms
   */
  static searchIndex(index, fileName, ...terms){

  }
}

module.exports = InvertedIndex;
