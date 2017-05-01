// Test parameters for api/create route
const validObject = [
  {
    title: 'An inquiry into',
    text: 'This string is'
  },
  {
    title: 'Into the',
    text: 'is used'
  }
];
module.exports.validObject = validObject;

const expectedResult = {
  index: {
    an: [0],
    into: [0, 1],
    inquiry: [0],
    is: [0, 1],
    string: [0],
    the: [1],
    this: [0],
    used: [1]
  },
  titles: {
    0: 'An inquiry into',
    1: 'Into the'
  }
};
module.exports.expectedResult = expectedResult;

const badJSON = 'abc';
module.exports.badJSON = badJSON;
/** Test parameters for api/search route */

// A sample valid index submitted by the search query
const sampleValidIndex = {
  'book1.json': {
    an: [0],
    into: [0, 1],
    inquiry: [0],
    is: [0, 1],
    string: [0],
    the: [1],
    this: [0],
    used: [1]
  }
};
module.exports.sampleValidIndex = sampleValidIndex;

// A sample invalid index
const invalidIndex = {
  'book1.json': { a: 'random obj' }
};
module.exports.invalidIndex = invalidIndex;

/** Searching for a single term */
const searchTerm = 'into';  // A sample search term
module.exports.searchTerm = searchTerm;

// A sample search query object submitted to the api/search route
const singleTermSearch = {
  index: sampleValidIndex,
  terms: searchTerm
};
module.exports.singleTermSearch = singleTermSearch;

const singleTermResult = { into: [0, 1] };  // The expected result from the search
module.exports.singleTermResult = singleTermResult;

/** Searching for an array of terms */
const searchTermArray = ['an', 'into']; // A sample array of search terms
// A sample search query submitted to the api/search route

const arrayOfTermsSearch = {
  index: sampleValidIndex,
  terms: searchTermArray
};
module.exports.arrayOfTermsSearch = arrayOfTermsSearch;

// Expected result from the search
const arrayOfTermsResult = {
  an: [0],
  string: [0, 1]
};
module.exports.arrayOfTermsResult = arrayOfTermsResult;

/** Searching multiple indices ('All' option) */
const sampleValidIndex2 = {
  'book2.json': {
    an: [0, 1],
    boy: [0, 1],
    into: [0],
    lost: [0, 1],
    mango: [0],
    table: [1],
    train: [0],
    user: [1]
  }
};
module.exports.sampleValidIndex2 = sampleValidIndex2;

// Sample search query object for single term search of multiple indices
const multipleIndicesSearch = {
  index: [sampleValidIndex, sampleValidIndex2],
  terms: searchTerm
};
module.exports.multipleIndicesSearch = multipleIndicesSearch;

// Expected result
const multipleIndicesResult = [
  { into: [0, 1] },
  { into: [0] }
];
module.exports.multipleIndicesResult = multipleIndicesResult;

// Sample search query object for multiple term search of multiple indices
const multipleIndicesMultipleTermsSearch = {
  index: [sampleValidIndex, sampleValidIndex2],
  terms: searchTermArray
};
module.exports.multipleIndicesMultipleTermsSearch = multipleIndicesMultipleTermsSearch;

// Expected result
const multipleIndicesMultipleTermsResult = [
  { an: [0], into: [0, 1] },
  { an: [0, 1], into: [0] }
];
module.exports.multipleIndicesMultipleTermsResult = multipleIndicesMultipleTermsResult;

/** Handling a varied number of search terms */
const searchTermArray2 = ['an', 'inquiry'];
module.exports.searchTermArray2 = searchTermArray2;

const variedTermsSearch = {
  index: sampleValidIndex,
  terms: [searchTerm, searchTermArray2]
};
module.exports.variedTermsSearch = variedTermsSearch;

const variedTermsResult = {
  an: [0],
  inquiry: [0],
  into: [0, 1]
};
module.exports.variedTermsSearchResult = variedTermsResult;
