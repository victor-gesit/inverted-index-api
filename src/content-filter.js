/**
 * This fucntion normalizes a sentence into lower case characters
 * and splits th sentence into an array of words
 * @return {Array} an array of words contained in the supplied sentence
 * @param {string} sentence The sentence to be split and normalized
 */
function splitandNormalize(sentence) {
  sentence = sentence.toLowerCase();
  const words = sentence.split(/\W+/);
  return words;
}

/**
 * This function removes empty strings from an array, removes duplicates,
 * and sorts the content in alphabetical order
 * @return {Array} the sorted array, with duplicates removed
 * @param {Array} tokens an array of tokens to be streamlined and sorted
 */
function removeDuplicatesAndSort(tokens) {
  // Remove empty string
  tokens.forEach((token) => {
    if (token.length === 0) {
      tokens.splice(tokens.indexOf(token), 1);
    }
  });
  const uniqueTokens = tokens.filter((item, pos) => tokens.indexOf(item) === pos);
  return uniqueTokens.sort();
}
/**
 * @return {Object} the filtered book, in the form:
 *  {title:'book title', words:['all', 'words', 'in', 'book']}
 * @param {Object} book to be filtered
 */
function filterBook(book) {
  // index words in title and text fields
  const allWords = `${book.title} ${book.text}`;
  const splitwords = splitandNormalize(allWords);
  const noDuplicates = removeDuplicatesAndSort(splitwords);
  const sortedBook = {};
  sortedBook.title = book.title;
  sortedBook.words = noDuplicates;
  return sortedBook;
}

/**
 * This function filters content of book and returns an easy to index object
 * @param {JSON} data the data supplied from file or req.body
 * @param {function} callback the callback, whose argument is the returned filtered data
 * @return {null} returns nothing
 */
export default function contentFilter(data, callback) {
  const allBooks = [];  // Holds sorted words
  const allWords = {};  // Holds all words in collection
  let wordList = [];  // value of wordList key
  // JSON object or JSON array?
  if (data instanceof Object && data instanceof Array) {
    data.forEach((book) => {
      const filteredBook = filterBook(book);
      wordList = wordList.concat(filteredBook.words);
      allBooks.push(filteredBook);
    });
  } else {
    const filteredBook = filterBook(data);
    wordList = wordList.concat(filteredBook.words);
    allBooks.push(filteredBook);
  }
  // Remove duplicates and sort wordList
  wordList = removeDuplicatesAndSort(wordList);
  // Add entry that contains all words in collection
  allWords.wordList = wordList;
  allBooks.push(allWords);
  callback(allBooks);
}

export { splitandNormalize, removeDuplicatesAndSort, filterBook };
