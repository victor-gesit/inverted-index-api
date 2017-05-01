module.exports = {
  makeIndex(filteredDocument, done) {
    const allWords = filteredDocument[filteredDocument.length - 1];
    const wordList = allWords.wordList;
    const index = {};
    const titles = {};
    const indices = {};
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
      indices.index = index;
      indices.titles = titles;
    });
    return done(indices);
  }
};
