const app = require('../app');
const request = require('supertest')(app);

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
const badJSON = 'abc';

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
// A sample invalid index
const invalidIndex = {
  'book1.json': { a: 'random obj' }
};

/** Searching for a single term */
const searchTerm = 'into';  // A sample search term
// A sample search query object submitted to the api/search route
const singleTermSearch = {
  index: sampleValidIndex,
  terms: searchTerm
};
const singleTermResult = { into: [0, 1] };  // The expected result from the search

/** Searching for an array of terms */
const searchTermArray = ['an', 'into']; // A sample array of search terms
// A sample search query submitted to the api/search route
const arrayOfTermsSearch = {
  index: sampleValidIndex,
  terms: searchTermArray
};
// Expected result from the search
const arrayOfTermsResult = {
  an: [0],
  string: [0, 1]
};

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

// Sample search query object for single term search of multiple indices
const multipleIndicesSearch = {
  index: [sampleValidIndex, sampleValidIndex2],
  terms: searchTerm
};

// Expected result
const multipleIndicesResult = [
  { into: [0, 1] },
  { into: [0] }
];

// Sample search query object for multiple term search of multiple indices
const multipleIndicesMultipleTermsSearch = {
  index: [sampleValidIndex, sampleValidIndex2],
  terms: searchTermArray
};

// Expected result
const multipleIndicesMultipleTermsResult = [
  { an: [0], into: [0, 1] },
  { an: [0, 1], into: [0] }
]

/** Handling a varied number of search terms */
const searchTermArray2 = ['an', 'inquiry']

const variedTermsSearch = {
  index: sampleValidIndex,
  terms: [searchTerm, searchTermArray2]
};
const variedTermsSearchResult = {
  an: [0],
  inquiry: [0],
  into: [0, 1]
};

describe('Read book data', () => {
  describe('Read book data', () => {
    it('ensures proper response when file is malformed', (done) => {
      request
       .post('/api/create')
       .send(badJSON)
       .expect({ error: 'malformed json' })
       .end((err, res) => {
         if (err) {
           return done(err);
         }
         done();
       });
    });
    it('ensures proper response when file is invalid', (done) => {
      request
       .post('/api/create')
       .send()
       .expect({ error: 'invalid file' })
       .end((err, res) => {
         if (err) {
           return done(err);
         }
         done();
       });
    });
    it('ensures proper response when file is empty', (done) => {
      request
        .post('/api/create')
        .send(null)
        .expect({ error: 'empty file' })
       .end((err, res) => {
         if (err) {
           return done(err);
         }
         done();
       });
    });
  });
  describe('Populate Index', () => {
    it('ensures index is created once JSON file is read', (done) => {
      request
        .post('/api/create')
        .send(validObject)
        .expect(expectedResult)
       .end((err, res) => {
         if (err) {
           return done(err);
         }
         done();
       });
    });
    it('ensures index is correct', (done) => {
      request
        .post('/api/create')
        .send(validObject)
        .expect(expectedResult)
       .end((err, res) => {
         if (err) {
           return done(err);
         }
         done();
       });
    });
  });
  describe('Search Index', () => {
    it('ensures passed in index is in valid format', (done) => {
      request
        .post('/api/search')
        .send(invalidIndex)
        .expect({ error: 'invalid index' })
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });
    it('ensures index returns the correct result when searched', (done) => {
      request
        .post('/api/search')
        .send(singleTermSearch)
        .expect(singleTermResult)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });
    it('ensures searchIndex can handle an array of search items', (done) => {
      request
        .post('api/search')
        .send(arrayOfTermsSearch)
        .expect(arrayOfTermsResult)
        .end((err, res) => {
          if (err) {
            done(err);
          }
          done();
        });
    });
    it('ensures searchIndex can handle a varied number of search terms as arguments', (done) => {
      request
        .post('api/search')
        .send(variedTermsSearch)
        .expect(variedTermsSearchResult)
        .end((err, res) => {
          if (err) {
            done(err);
          }
          done();
        });
    });
    it('ensures goes through all indexed files if a filename/key is not passed', (done) => {
      request
        .post('/api/search')
        .send(multipleIndicesSearch)
        .expect(multipleIndicesResult)
        .end((err, res) => {
          if (err) {
            done(err);
          }
          done();
        });
    });
    it('can search multiple indices for an array of search terms', (done) => {
      request
        .post('/api/search')
        .send(multipleIndicesMultipleTermsSearch)
        .expect(multipleIndicesMultipleTermsResult)
        .end((err, res) => {
          if (err) {
            done(err);
          }
          done();
        });
    });
  });
});
