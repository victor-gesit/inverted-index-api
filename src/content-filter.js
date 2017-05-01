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
  const allWords = `${book.title} ${book.text}`;
  const splitwords = splitandNormalize(allWords);
  const noDuplicates = removeDuplicatesAndSort(splitwords);
  const sortedBook = {};
  sortedBook.title = book.title;
  sortedBook.words = noDuplicates;
  return sortedBook;
}

/**
 * data comes in as
 * [
  {
    "title": "Alice in Wonderland",
    "text": "Alice falls into a rabbit hole and enters a world full of imagination."
  },
  {
    "title": "Eze Goes to School",
    "text": "Eze was such a funny kid at school while alice is in wonderland"
  }
  ]
  AND LEAVES AS
  [
    {[{title: 'Alice in Wonderland', words:['a', 'alice', 'enters', 'falls', ...]},
      {title: 'Eze Goes to School', words:['a', 'alice', 'at', 'eze', 'funny', ...]}
    ]},
    {allwords: [a, alice, at, eze, funny, ...]}
  ]
 * @param {JSON} data the data supplied from file or req.body
 * @param {function} callback the callback, whose argument is the returned filtered data
 * @return {null} returns nothing
 */
module.exports.contentFilter = (data, callback) => {
  const allBooks = [];  // An array that will hold all the books, after they're sorted
  const allWords = {};  // An object that holds the wordList, a list of all words in the collection
  let wordList = [];  // This goes into the allWords object, with a key wordList
  // Check to see if it's a single book, or books in an array
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
  // Add an entry into the allBooks array that contains all words in the collectfion
  allWords.wordList = wordList;
  allBooks.push(allWords);
  callback(allBooks);
};
