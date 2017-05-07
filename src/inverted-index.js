import async from 'async';
import filter from './content-filter';
import makeAnIndex from './make-index';

const makeIndex = makeAnIndex.makeIndex;

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
  createIndex(fileName, fileContent) {
    this.index = {};
    let indexed = false; // Keep track of indexing operation
    filter.contentFilter(fileContent, (filteredDocument) => {
      async.series([
        (callback) => {
          makeIndex(fileName, filteredDocument, (index) => {
            // this.index[fileName] = index[fileName];
            this.index[fileName] = index;
            callback(null);
            // return this.index;
          });
        },
        () => {
          indexed = true;
        }
      ]);
    });
    if (indexed) {
      return this.index;
    }
  }
  /**
   * @return {Array} returns the indices of the terms
   * @param {JSON} index the index to be searched
   * @param {*} terms the terms to search for
   */
  searchIndex(index, ...terms) {
    const result = {};
    const tokens = [];
    let validIndex = true;
    // Validate index
    Object.keys(index).forEach((fileName) => {
      if ((index[fileName].index === null || index[fileName].index === undefined)) {
        validIndex = false;
        return;
      }
      Object.keys((index[fileName].index)).forEach((token) => {
        // check content of token indices
        if (!((index[fileName].index[token]) instanceof Array)) {
          validIndex = false;
        } else {
          (index[fileName].index[token]).forEach((digit) => {
            if ((typeof digit) !== 'number') {
              validIndex = false;
              return false;
            }
          });
        }
      });
    });
    if (!validIndex) {
      return { error: 'invalid index' };
    }
    // Check to see if file name was specified
    if (this.hasFileName(terms)) {
      const fileIndex = {};
      const fileName = terms[0];
      // Check if index exists for file name
      if (index[fileName] === undefined) {
        return { error: 'no index created for that book' };
      }
      // Check if index has valid content for that file name
      const indexForFile = index[fileName].index;
      if (indexForFile === undefined) {
        return { error: 'no index created for that book' };
      }
      const searchTerms = terms.slice(1, terms.length);
      this.getTokens(searchTerms, tokens);
      tokens.forEach((token) => {
        fileIndex[token] = indexForFile[token];
      });
      result[fileName] = fileIndex;
    } else {
      // Loop through index object for all files
      Object.keys(index).forEach((fileName) => {
        const fileIndex = {};
        const indexForFile = index[fileName].index;
        const searchTerms = terms;
        this.getTokens(searchTerms, tokens);
        tokens.forEach((token) => {
          fileIndex[token] = indexForFile[token];
        });
        result[fileName] = fileIndex;
      });
    }
    return result;
  }
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
      } else if (element.indexOf(' ') >= 0) { // Check for words with spaces
        const reflatten = element.split(/\s+/);
        this.getTokens(reflatten, flattened);
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
}

module.exports = InvertedIndex;
