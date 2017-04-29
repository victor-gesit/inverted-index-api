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
  // Remove empty string
  for (const item in arr){
    if (arr[item].length === 0) {
      arr.splice(item, 1);
    }
  }
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

module.exports.contentFilter = (data, callback) => {
  const allBooks = [];  // An array that will hold all the books, after they're sorted
  const allWords = {};  // An object that holds the wordList, a list of all words in the collection
  let wordList = [];  // This goes into the allWords object, with a key wordList
  // Check to see if it's a single book, or books in an array
  if (data instanceof Object && data instanceof Array) {
    for (const item in data) {
      const filteredBook = filterBook(data[item]);
      wordList = wordList.concat(filteredBook.words);
      allBooks.push(filteredBook);
    }
  } else {
    const filteredBook = filterBook(data);
    wordList = wordList.concat(filteredBook.words);
    allBooks.push(filteredBook);
  }
  // Remove duplicates and sort wordList
  wordList = removeDuplicatesAndSort(wordList);
  // Add an entry into the allBooks array that contains all words in the collectfion
  allWords.wordList = wordList;
  allBooks.push(allWords);
  callback(allBooks);
  // return allBooks;
};
