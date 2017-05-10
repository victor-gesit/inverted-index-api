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
  /** Makes and inverted index from file content provided
   * @return {Object} index of supplied document
   * @param {string} fileName The name of the file whose index is to be created
   * @param {string} fileContent The content of the file
   * @param {function} done A callback, whose argument is the returned index
   */
  createIndex(fileName, fileContent) {
    let indexed = false;
    let indexOfThisFile = {};
    contentFilter(fileContent, (filteredDocument) => {
      async.series([
        (callback) => {
          makeIndex(fileName, filteredDocument, (index) => {
            indexOfThisFile = index;
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
      return indexOfThisFile;
    }
  }
  /**
   * Searches the supplied index for the indices of
   * the specified terms
   * @return {Array} returns the indices of the terms
   * @param {JSON} index the index to be searched
   * @param {*} terms the terms to search for
   */
  searchIndex(index, ...terms) {
    const result = {};
    const tokens = [];
    if (index === undefined) {
      index = this.index;
    }
    if (Object.keys(index).length === 0) {
      return { error: 'no index created yet, please create one' };
    }
    // Check if file name is specified
    if (this.hasFileName(terms)) {
      const fileIndex = {};
      const fileName = terms[0];
      // Check if index exists for file name
      if (index[fileName] === undefined) {
        return { error: 'no index available for that book' };
      }
      // Check if index has valid content for file name
      const indexForFile = index[fileName].index;
      if (indexForFile === undefined) {
        return { error: 'no index created for that book' };
      }
      const searchTerms = terms.slice(1, terms.length);
      this.getTokens(searchTerms, tokens);
      tokens.forEach((token) => {
        if (indexForFile[token] === undefined) {
          // Add empty array if token is absent
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
        if (indexForFile === undefined) {
          // Continue to next file
          return;
        }
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
   * @param {*} filteredTokens The flattened array, filled by closure
   * @returns {null} returns null
   */
  getTokens(items, filteredTokens) {
    items.forEach((element) => {
      if (Array.isArray(element)) {
        this.getTokens(element, filteredTokens);
      } else if (element.indexOf(' ') >= 0) {
        // Check for words with spaces
        const spacesRemoved = element.split(/\s+/);
        this.getTokens(spacesRemoved, filteredTokens);
      } else {
        filteredTokens.push(element);
      }
    });
  }

  /**
   * The hasFileName checks if the first term in the array is a file name
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

export default new InvertedIndex();
