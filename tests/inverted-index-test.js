const app = require('../app');
const request = require('supertest')(app);
const init = require('./init');

// Test parameters for api/create route
const validObject = init.validObject,
  expectedResult = init.expectedResult,
  badJSON = init.badJSON,

  /** Test parameters for api/search route */
  invalidIndex = init.invalidIndex,
  singleTermSearch = init.singleTermSearch,
  singleTermResult = init.singleTermResult,
  arrayOfTermsSearch = init.arrayOfTermsSearch,
  arrayOfTermsResult = init.arrayOfTermsResult,
  multipleIndicesSearch = init.multipleIndicesSearch,
  multipleIndicesResult = init.multipleIndicesResult,
  multipleIndicesMultipleTermsSearch = init.multipleIndicesMultipleTermsSearch,
  multipleIndicesMultipleTermsResult = init.multipleIndicesMultipleTermsResult,
  variedTermsSearch = init.variedTermsSearch,
  variedTermsResult = init.variedTermsResult;

describe('Read book data', () => {
  describe('Read book data', () => {
    it('ensures proper response when file is malformed', (done) => {
      request
       .post('/api/create')
       .send(badJSON)
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
       .send()
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
        .send(null)
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
        .send(validObject)
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
        .send(validObject)
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
