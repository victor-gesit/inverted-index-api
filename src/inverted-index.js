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
        const allWords = filteredDocument[filteredDocument.length - 1];
        console.log('allWords: ' + allWords.wordList);
        const wordList = allWords.wordList;
        const index = {};
        for (let item in wordList) {
            const wordArray = [];
            for(let i = 0; i < filteredDocument.length - 1; i += 1) {
                let book = filteredDocument[i];
                let wordsInBook = book.words;
                if (wordsInBook.indexOf(wordList[item]) !== -1) {
                    wordArray.push(i);
                }
            }
            let word = wordList[item];
            console.log(wordArray);
            index[word] = wordArray;
        }
        console.log(index);
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
