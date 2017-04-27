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
 * @param {Array} arr and array whose content will be sorted and streamlined
 */
function removeDuplicatesAndSort(arr) {
  const uniqueArray = arr.filter((item, pos) => {
    return arr.indexOf(item) === pos;
  });
  return uniqueArray.sort();
}


module.exports.contentFilter = (data) => {
  let allBooks = [];
  if (typeof (data) === typeof ([])) {
    for (let book in data) {
      const allWords = `${book.title} ${book.text}`;
      const splitwords = splitandNormalize(allWords);
      const noDuplicates = removeDuplicatesAndSort(splitwords);
      const sortedBook = {};
      sortedBook.title = book.title;
      sortedBook.words = noDuplicates;
      allBooks.push(sortedBook);
    }
  }
};
