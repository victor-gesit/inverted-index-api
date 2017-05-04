import supertest from 'supertest';
import app from '../app';
import searchFixture from '../fixtures/search-fixtures';
import InvertedIndex from '../src/inverted-index';

const request = supertest(app);
const invertedIndex = new InvertedIndex();

// Expected test result for search route when valid file is supplied
const expectedResult = {
  'valid-file.json': {
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

  /** Test parameters for api/search route */
const
  searchTerm = searchFixture.searchTerm,
  searchTermArray = searchFixture.searchTermArray,
  validIndex = searchFixture.sampleValidIndex,
  invalidIndex = searchFixture.invalidIndex,
  singleTermResult = searchFixture.singleTermResult,
  arrayOfTermsResult = searchFixture.arrayOfTermsResult,
  multipleIndices = searchFixture.multipleIndices,
  multipleIndicesResult = searchFixture.multipleIndicesResult,
  multipleIndicesMultipleTermsResult = searchFixture.multipleIndicesMultipleTermsResult,
  variedTermsResult = searchFixture.variedTermsResult;

describe('Read book data', () => {
  describe('Read book data', () => {
    it('ensures proper response when file is malformed', (done) => {
      request
       .post('/api/create')
       .attach('file', 'fixtures/malformed.json')
       .expect({ error: 'malformed json' })
       .end((err) => {
         if (err) {
           return done(err);
         }
         done();
       });
    });
    it('ensures proper response when file is invalid', (done) => {
      request
       .post('/api/create')
       .attach('file', 'fixtures/invalid-file-type.txt')
       .expect({ error: 'invalid file type' })
       .end((err) => {
         if (err) {
           return done(err);
         }
         done();
       });
    });
    it('ensures proper response when file is empty', (done) => {
      request
        .post('/api/create')
        .attach('file', 'fixtures/empty-file.json')
        .expect({ error: 'empty file' })
       .end((err) => {
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
        .attach('file', 'fixtures/valid-file.json')
        .expect(expectedResult)
       .end((err) => {
         if (err) {
           return done(err);
         }
         done();
       });
    });
    it('ensures index is correct', (done) => {
      request
        .post('/api/create')
        .attach('file', 'fixtures/valid-file.json')
        .expect(expectedResult)
       .end((err) => {
         if (err) {
           return done(err);
         }
         done();
       });
    });
  });
  describe('Search Index', () => {
    it('ensures passed in index is in valid format', (done) => {
      const expectation = invertedIndex.searchIndex(invalidIndex, 'into');
      expect(expectation)
        .toEqual({ error: 'invalid index' });
      done();
    });
    it('ensures index returns the correct result when searched', (done) => {
      const expectation = invertedIndex.searchIndex(validIndex, 'into');
      expect(expectation)
        .toEqual(singleTermResult);
      done();
    });
    it('ensures searchIndex can handle an array of search items', (done) => {
      const expectation = invertedIndex.searchIndex(validIndex, searchTermArray);
      expect(expectation)
        .toEqual(arrayOfTermsResult);
      done();
    });
    it('ensures searchIndex can handle a varied number of search terms as arguments', (done) => {
      const expectation = invertedIndex.searchIndex(validIndex, 'into', ['an', 'inquiry']);
      expect(expectation)
        .toEqual(variedTermsResult);
      done();
    });
    it('ensures goes through all indexed files if a filename/key is not passed', (done) => {
      const expectation = invertedIndex.searchIndex(multipleIndices, searchTerm);
      expect(expectation)
        .toEqual(multipleIndicesResult);
      done();
    });
    it('can search multiple indices for an array of search terms', (done) => {
      const expectation = invertedIndex.searchIndex(multipleIndices, searchTermArray);
      expect(expectation)
        .toEqual(multipleIndicesMultipleTermsResult);
      done();
    });
  });
});
