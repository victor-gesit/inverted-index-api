const filter = require('./content-filter');
const makeIndex = require('./make-index').makeIndex;


function hasFileName(args) {
  const possibleFileName = args[0];
  const fileExtension = possibleFileName.split('.').pop();
  if (fileExtension.toUpperCase() === 'JSON') {
    return true;
  }
}


function getTokens(items, tokensArray) {
  items.forEach((element) => {
    if (Array.isArray(element)) {
      getTokens(element, tokensArray);
    } else {
      tokensArray.push(element);
    }
  });
}


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
    if (hasFileName(terms)) {
      const fileName = terms[0];
      console.log('fileName, Named: ' + fileName);
      const indexForFile = index[fileName];
      const searchTerms = terms.slice(1, terms.length);
      getTokens(searchTerms, tokens);
      tokens.forEach((token) => {
        result[token] = indexForFile[token];
      });
    } else {
      const fileName = Object.keys(index)[0];
      console.log('fileName, Unnamed: ' + fileName);
      const indexForFile = index[fileName];
      const searchTerms = terms;
      getTokens(searchTerms, tokens);
      tokens.forEach((token) => {
        result[token] = indexForFile[token];
      });
    }
    return result;
  }
}

module.exports = InvertedIndex;
