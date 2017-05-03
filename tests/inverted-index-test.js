import supertest from 'supertest';
import app from '../app';
import searchFixture from '../fixtures/search-fixtures';

const request = supertest(app);

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
  }
};

  /** Test parameters for api/search route */
const
  invalidIndex = searchFixture.invalidIndex,
  singleTermSearch = searchFixture.singleTermSearch,
  singleTermResult = searchFixture.singleTermResult,
  arrayOfTermsSearch = searchFixture.arrayOfTermsSearch,
  arrayOfTermsResult = searchFixture.arrayOfTermsResult,
  multipleIndicesSearch = searchFixture.multipleIndicesSearch,
  multipleIndicesResult = searchFixture.multipleIndicesResult,
  multipleIndicesMultipleTermsSearch = searchFixture.multipleIndicesMultipleTermsSearch,
  multipleIndicesMultipleTermsResult = searchFixture.multipleIndicesMultipleTermsResult,
  variedTermsSearch = searchFixture.variedTermsSearch,
  variedTermsResult = searchFixture.variedTermsResult;

describe('Read book data', () => {
  describe('Read book data', () => {
    it('ensures proper response when file is malformed', (done) => {
      request
       .post('/api/create')
       .attach('file', '../fixtures/malformed-file.json')
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
       .attach('file', '../fixtures/invalid-file-type.txt')
       .expect({ error: 'invalid file' })
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
        .attach('file', '../fixtures/empty-file.json')
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
        .attach('file', '../fixtures/valid-file.json')
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
        .attach('file', '../fixtures/valid-file.json')
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
      request
        .post('/api/search')
        .send(invalidIndex)
        .expect({ error: 'invalid index' })
        .end((err) => {
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
        .end((err) => {
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
        .end((err) => {
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
        .expect(variedTermsResult)
        .end((err) => {
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
        .end((err) => {
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
        .end((err) => {
          if (err) {
            done(err);
          }
          done();
        });
    });
  });
});
