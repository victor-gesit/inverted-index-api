// Implements index creation algorithm
export default {
  /**
   * This implements the index creatin algorithm
   * @param {String} fileName name of file
   * @param {Object} filteredDocument A preformatted document
   * @param {Function} done callback that passes the created index
   * @return {undefined} returns nothing
   */
  makeIndex(fileName, filteredDocument, done) {
    const allWords = filteredDocument[filteredDocument.length - 1];
    const wordList = allWords.wordList;
    const index = {};
    const titles = {};
    const indexOfFile = {};
    wordList.forEach((word) => {
      const wordArray = [];
      for (let i = 0; i < filteredDocument.length - 1; i += 1) {
        const book = filteredDocument[i];
        titles[i] = filteredDocument[i].title;
        const wordsInBook = book.words;
        if (wordsInBook.indexOf(word) !== -1) {
          wordArray.push(i);
        }
      }
      index[word] = wordArray;
      indexOfFile.index = index;
      indexOfFile.titles = titles;
    });
    return done(indexOfFile);
  }
};
