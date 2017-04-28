const filter = require('./contentFilter');
/**
 * Implementing the Inverted Index search procedure
 */
class InvertedIndex {
  /**
   * @return {Object} index of supplied document
   * @param {*} fileName
   * @param {*} fileContent
   */
   createIndex(fileName, fileContent) {
     filter.contentFilter(fileContent, (filteredDocument) => {
        const allWords = filteredDocument[filteredDocument.length - 2];
        const wordList = allWords.wordList;
        const index = {};
        for (let word in wordList) {
            const wordArray = [];
            for(let i = 0; i < filteredDocument.length - 2; i += 1) {
                let book = filteredDocument[i];
                let wordsInBook = book.words;
                if (wordsInBook.indexOf(word) !== -1) {
                    wordArray.push(i);
                }
            }
            index[word] = wordArray;
        }
        return index;
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
