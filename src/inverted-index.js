import async from 'async';
import contentFilter from './content-filter';
import makeAnIndex from './make-index';

const makeIndex = makeAnIndex.makeIndex;

/**
 * Implementing the Inverted Index search procedure
 */
class InvertedIndex {
  /**
   * This creates an instance of inverted index, and initializes the index
   */
  constructor() {
    this.index = {};
  }
  /**
   * @return {Object} index of supplied document
   * @param {string} fileName The name of the file whose index is to be created
   * @param {string} fileContent The content of the file
   * @param {function} done A callback, whose argument is the returned index
   */
  createIndex(fileName, fileContent) {
    let indexed = false; // Keep track of indexing operation
    contentFilter(fileContent, (filteredDocument) => {
      async.series([
        (callback) => {
          makeIndex(fileName, filteredDocument, (index) => {
            this.index[fileName] = index;
            callback(null);
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
      // Check for files with error
      if (Object.keys(index[fileName])[0] === 'error') {
        return; // This file had an error during index creation
      }
      // Check for files without index key
      if (Object.keys(index[fileName])[0] !== 'index') {
        validIndex = false;
      } else {
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
      }
    });
    if (!validIndex) {
      return { error: 'invalid index' };
    } else
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
        if (indexForFile[token] === undefined) {
          fileIndex[token] = [];
        } else {
          fileIndex[token] = indexForFile[token];
        }
      });
      result[fileName] = fileIndex;
    } else {
      // Loop through index object for all files
      Object.keys(index).forEach((fileName) => {
        const fileIndex = {};
        // Skip files with error
        if (Object.keys(index[fileName])[0] === 'error') {
          return; // Continue to next file
        }
        const indexForFile = index[fileName].index;
        const searchTerms = terms;
        this.getTokens(searchTerms, tokens);
        tokens.forEach((token) => {
          if (indexForFile[token] === undefined) {  // When the term is not in the book
            fileIndex[token] = [];
          } else {
            fileIndex[token] = indexForFile[token];
          }
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
  getTokens(items, filteredTokens) {
    items.forEach((element) => {
      if (Array.isArray(element)) {
        this.getTokens(element, filteredTokens);
      } else if (element.indexOf(' ') >= 0) { // Check for words with spaces
        const spacesRemoved = element.split(/\s+/);
        this.getTokens(spacesRemoved, filteredTokens);
      } else {
        filteredTokens.push(element);
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
