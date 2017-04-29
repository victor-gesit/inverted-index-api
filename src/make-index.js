module.exports = {
  makeIndex(filteredDocument, done) {
    const allWords = filteredDocument[filteredDocument.length - 1];
    const wordList = allWords.wordList;
    const index = {};
    for (const item in wordList) {
      const wordArray = [];
      for(let i = 0; i < filteredDocument.length - 1; i += 1) {
        const book = filteredDocument[i];
        const wordsInBook = book.words;
        if (wordsInBook.indexOf(wordList[item]) !== -1) {
          wordArray.push(i);
        }
      }
      const word = wordList[item];
      index[word] = wordArray;
    }
    return done(index);
  }
};
