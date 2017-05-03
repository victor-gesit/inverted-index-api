import filter from './content-filter';
import makeAnIndex from './make-index';

const makeIndex = makeAnIndex.makeIndex;

/**
 * Implementing the Inverted Index search procedure
 */
class InvertedIndex {
  /**
   * This method flattens embedded arrays into a single array
   * @param {Array} items An array to be flattened
   * @param {*} flattened The flattened array, filled by closure
   * @returns {null} returns null
   */
  getTokens(items, flattened) {
    items.forEach((element) => {
      if (Array.isArray(element)) {
        this.getTokens(element, flattened);
      } else {
        flattened.push(element);
      }
    });
  }

  /**
   * This method checks if the first term in the array is a file name
   * @returns {boolean} returns a boolean to indicate if it has file name
   * @param {Array} args an array whose content is to be checked
   */
  hasFileName(args) {
    const flattenedArguments = [];
    this.getTokens(args, flattenedArguments);
    const possibleFileName = flattenedArguments[0];
    const fileExtension = possibleFileName.split('.').pop();
    if (fileExtension.toUpperCase() === 'JSON') {
      return true;
    }
  }
  /**
   * @return {Object} index of supplied document
   * @param {string} fileName The name of the file whose index is to be created
   * @param {string} fileContent The content of the file
   * @param {function} done A callback, whose argument is the returned index
   */
  createIndex(fileName, fileContent, done) {
    filter.contentFilter(fileContent, (filteredDocument) => {
      makeIndex(fileName, filteredDocument, index => done(index));
    });
  }
  /**
   * @return {Array} find
   * @param {*} index
   * @param {*} fileName
   * @param {*} terms
   */
  searchIndex(index, ...terms) {
    const result = {};
    const tokens = [];
    if (this.hasFileName(terms)) {
      const fileName = terms[0];
      const indexForFile = index[fileName];
      const searchTerms = terms.slice(1, terms.length);
      this.getTokens(searchTerms, tokens);
      tokens.forEach((token) => {
        result[token] = indexForFile[token];
      });
    } else {
      const fileName = Object.keys(index)[0];
      const indexForFile = index[fileName];
      const searchTerms = terms;
      this.getTokens(searchTerms, tokens);
      tokens.forEach((token) => {
        result[token] = indexForFile[token];
      });
    }
    return result;
  }
}

module.exports = InvertedIndex;
