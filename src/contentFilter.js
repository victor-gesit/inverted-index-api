/**
 * @return {Array} an array of words contained in the supplied sentence
 * @param {string} sentence The sentence to be split and normalized
 */
function splitandNormalize(sentence) {
  // Normalize sentence
  sentence = sentence.toLowerCase();
  const words = sentence.split(/\W+/);
  return words;
}

/**
 * @return {Array} the sorted array, with duplicates removed
 * @param {Array} arr an array whose content will be sorted and streamlined
 */
function removeDuplicatesAndSort(arr) {
  const uniqueArray = arr.filter((item, pos) => {
    return arr.indexOf(item) === pos;
  });
  return uniqueArray.sort();
}
/**
 * @return {Object} the filtered book;
 * @param {Object} book to be filtered
 */
function filterBook(book) {
  const allWords = `${book.title} ${book.text}`;
  const splitwords = splitandNormalize(allWords);
  const noDuplicates = removeDuplicatesAndSort(splitwords);
  const sortedBook = {};
  sortedBook.title = book.title;
  sortedBook.words = noDuplicates;
  return sortedBook;
}


module.exports.contentFilter = (data) => {
  const allBooks = [];  // An array that will hold all the books, after they're sorted
  const allWords = {};  // An object that holds the wordList, a list of all words in the collection
  const wordList = [];  // This goes into the allWords object, with a key wordList
  // Check to see if it's a single book, or books in an array
  if (data instanceof Object && data instanceof Array) {
    for (const book in data) {
      const filteredBook = filterBook(book);
      allBooks.push(filteredBook);
      wordList.concat(filteredBook.words);
    }
  } else {
    const filteredBook = filterBook(data);
    allBooks.push(filteredBook);
    wordList.concat(filteredBook.words);
  }
  // Add an entry into the allBooks array that contains all words in the collection
  allWords.wordList = wordList;
  allBooks.push(allWords);
  return allBooks;
};
