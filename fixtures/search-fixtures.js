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
  'book1.json': { a: 'ABRACA DABRA' },
  'book2.json': { aboby: 'WASSUP YOU' }
};
module.exports.invalidIndex = invalidIndex;

/** Searching for a single term */
const searchTerm = 'into';  // A sample search term
module.exports.searchTerm = searchTerm;

const singleTermResult = {
  'book1.json': {
    into: [0, 1]
  }
};  // The expected result from the search
module.exports.singleTermResult = singleTermResult;

/** Searching for an array of terms */
const searchTermArray = ['an', 'into']; // A sample array of search terms
module.exports.searchTermArray = searchTermArray;

// Expected result from the search
const arrayOfTermsResult = {
  'book1.json': {
    an: [0],
    into: [0, 1]
  }
};
module.exports.arrayOfTermsResult = arrayOfTermsResult;

/** Searching multiple indices ('All' option) */
const multipleIndices = {
  'book1.json': {
    an: [0],
    into: [0, 1],
    inquiry: [0],
    is: [0, 1],
    string: [0],
    the: [1],
    this: [0],
    used: [1]
  },
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
module.exports.multipleIndices = multipleIndices;

// Expected result
const multipleIndicesResult = {
  'book1.json': { into: [0, 1] },
  'book2.json': { into: [0] }
};
module.exports.multipleIndicesResult = multipleIndicesResult;

// Sample search query object for multiple term search of multiple indices
// Expected result
const multipleIndicesMultipleTermsResult = {
  'book1.json': { an: [0], into: [0, 1] },
  'book2.json': { an: [0, 1], into: [0] }
};
module.exports.multipleIndicesMultipleTermsResult = multipleIndicesMultipleTermsResult;

/** Handling a varied number of search terms */
const variedTermsResult = {
  'book1.json': {
    an: [0],
    inquiry: [0],
    into: [0, 1]
  }
};
module.exports.variedTermsResult = variedTermsResult;
