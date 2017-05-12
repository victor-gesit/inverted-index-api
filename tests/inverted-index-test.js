import supertest from 'supertest';
import app from '../app';
import searchFixture from '../fixtures/search-fixtures';
import invertedIndex from '../src/inverted-index';
import { splitandNormalize, filterBook, removeDuplicatesAndSort } from '../src/content-filter';

const request = supertest(app);
// Expected test result for search route when valid file is supplied
const expectedResult = {
  'valid-file.json': {
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
  }
};

describe('Application Tests', () => {
  describe('Read book data tests', () => {
    it('ensures proper response when file has invalid json in content', (done) => {
      request
       .post('/api/create')
       .attach('files', 'fixtures/invalid-json-content.json')
       .expect({ 'invalid-json-content.json':
         { error: 'invalid json in file content' } })
       .end((err) => {
         if (err) {
           return done(err);
         }
         done();
       });
    });
    it('gives proper response for file with bad content, though valid json', (done) => {
      request
        .post('/api/create')
        .attach('files', 'fixtures/no-title-or-text-field.json')
        .expect({ 'no-title-or-text-field.json':
          { error: 'no title or text field in book' } })
        .end((err) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });
    it('gives proper response for file with bad content, though valid json array', (done) => {
      request
        .post('/api/create')
        .attach('files', 'fixtures/no-title-or-text-field-2.json')
        .expect({ 'no-title-or-text-field-2.json':
        { error: 'no title or text field in one or more books' } })
        .end((err) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });
    it('ensures proper response when file type is invalid, e.g. image files', (done) => {
      request
       .post('/api/create')
       .attach('files', 'fixtures/invalid-file-type.txt')
       .expect({ 'invalid-file-type.txt':
        { error: 'invalid file type' } })
       .end((err) => {
         if (err) {
           return done(err);
         }
         done();
       });
    });
    it('ensures proper response when no file is uploaded', (done) => {
      request
        .post('/api/create')
        .attach()
        .expect({ error: 'no file uploaded' })
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
        .attach('files', 'fixtures/empty-file.json')
        .expect({ 'empty-file.json':
          { error: 'empty file' } })
       .end((err) => {
         if (err) {
           return done(err);
         }
         done();
       });
    });
    it('ensures proper respone when JSON array is empty', (done) => {
      request
        .post('/api/create')
        .attach('files', 'fixtures/empty-json-array.json')
        .expect({ 'empty-json-array.json':
          { error: 'empty json array in file' } })
        .end((err) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });
  });
  describe('Populate Index test', () => {
    it('ensures proper response when search is made before creating index', (done) => {
      request
        .post('/api/search')
        .send(searchFixture.searchBeforCreatingIndex)
        .expect({ error: 'no index created yet, please create one' })
        .end((err) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });
    it('ensures index is created once JSON file is read', (done) => {
      request
        .post('/api/create')
        .attach('files', 'fixtures/valid-file.json')
        .expect(expectedResult)
       .end((err) => {
         if (err) {
           return done(err);
         }
         done();
       });
    });
    it('ensures index gives response for files with a single book', (done) => {
      request
        .post('/api/create')
        .attach('files', 'fixtures/single-book.json')
        .expect(searchFixture.singleBookResult)
      .end((err) => {
        if (err) {
          return done(err);
        }
        done();
      });
    });
    it('ensures index created is correct', (done) => {
      request
        .post('/api/create')
        .attach('files', 'fixtures/valid-file.json')
        .expect(expectedResult)
       .end((err) => {
         if (err) {
           return done(err);
         }
         done();
       });
    });
  });
  describe('searchIndex method test', () => {
    it('ensures index returns the correct result when searched', (done) => {
      const expectation = invertedIndex.searchIndex(searchFixture.sampleValidIndex, 'into');
      expect(expectation)
        .toEqual(searchFixture.singleTermResult);
      done();
    });
    it('ensures searchIndex can handle an array of search items', (done) => {
      const expectation = invertedIndex.searchIndex(searchFixture.sampleValidIndex,
        searchFixture.searchTermArray);
      expect(expectation)
        .toEqual(searchFixture.arrayOfTermsResult);
      done();
    });
    it('ensures searchIndex can handle a varied number of search terms as arguments', (done) => {
      const expectation = invertedIndex.searchIndex(searchFixture.sampleValidIndex,
        'into an', ['an', 'inquiry']);
      expect(expectation)
        .toEqual(searchFixture.variedTermsResult);
      done();
    });
    it('ensures searchIndex returns specific index when file name is specified', (done) => {
      const expectation = invertedIndex.searchIndex(searchFixture.multipleIndices,
        'book1.json', ['an', 'into']);
      expect(expectation)
        .toEqual(searchFixture.fileNamedResult);
      done();
    });
    it('ensures correct response when file name has no created index for it', (done) => {
      const expectation = invertedIndex.searchIndex(searchFixture.multipleIndices,
        'book8.json', ['an', 'into']);
      expect(expectation)
        .toEqual({ error: 'no index available for that book' });
      done();
    });
    it('ensures searchIndex through all indexed files if a filename/key is not passed', (done) => {
      const expectation = invertedIndex.searchIndex(searchFixture.multipleIndices,
        searchFixture.searchTerm);
      expect(expectation)
        .toEqual(searchFixture.multipleIndicesResult);
      done();
    });
    it('ensures searchIndex can search multiple indices for an array of search terms', (done) => {
      const expectation = invertedIndex.searchIndex(searchFixture.multipleIndices,
        searchFixture.searchTermArray);
      expect(expectation)
        .toEqual(searchFixture.multipleIndicesMultipleTermsResult);
      done();
    });
  });
  describe('api/search route test', () => {
    it('ensures proper result when file name is specified', (done) => {
      request
        .post('/api/search')
        .send(searchFixture.searchWithFileName)
        .expect(searchFixture.searchWithFileNameResult)
       .end((err) => {
         if (err) {
           return done(err);
         }
         done();
       });
    });
    it('ensures proper result when file name is not specified', (done) => {
      request
        .post('/api/search')
        .send(searchFixture.searchWithoutFileName)
        .expect(searchFixture.searchWithoutFileNameResult)
       .end((err) => {
         if (err) {
           return done(err);
         }
         done();
       });
    });
    it('ensures proper response when terms to search are not specified', (done) => {
      request
        .post('/api/search')
        .send(searchFixture.searchWithoutTerms)
        .expect({ error: 'no search terms specified' })
        .end((err) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });
    it('ensures proper response when file to search for has no index created for it', (done) => {
      request
        .post('/api/search')
        .send(searchFixture.noIndexForFileName)
        .expect({ error: 'no index available for that book' })
        .end((err) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });
    it('ensures proper response when index is supplied as string', (done) => {
      request
        .post('/api/search')
        .send(searchFixture.indexAsString)
        .expect({ 'book1.json': {
          an: [0, 1],
          boy: [1, 0]
        } })
        .end((err) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });
    it('ensures passed in index is in valid format', (done) => {
      request
        .post('/api/search')
        .send(searchFixture.invalidIndex)
        .expect({ error: 'invalid index supplied' })
      .end((err) => {
        if (err) {
          return done(err);
        }
        done();
      });
    });
    it('ensures passed-in index has correct content for token indices', (done) => {
      request
        .post('/api/search')
        .send(searchFixture.invalidIndex2)
        .expect({ error: 'invalid index supplied' })
      .end((err) => {
        if (err) {
          return done(err);
        }
        done();
      });
    });
    it('ensures passed-in index has numbers in the token indices', (done) => {
      request
        .post('/api/search')
        .send(searchFixture.invalidIndex3)
        .expect({ error: 'invalid index supplied' })
      .end((err) => {
        if (err) {
          return done(err);
        }
        done();
      });
    });
  });
  describe('Test for helper methods', () => {
    it('ensures that splitAndNormalize returns correct output', (done) => {
      const normalized = splitandNormalize('alice in wonderland');
      expect(normalized).toEqual(['alice', 'in', 'wonderland']);
      done();
    });
    it('ensures that removeDuplicatesAndSort returns correct output', (done) => {
      const filtered = removeDuplicatesAndSort(['we', 'are', 'we', 'was']);
      expect(filtered).toEqual(['are', 'was', 'we']);
      done();
    });
    it('ensures that filterBook returns correct output', (done) => {
      const book = {
        title: 'Gulliver Travels',
        text: 'Giant here, tiny there'
      };
      const filtered = filterBook(book);
      expect(filtered).toEqual({ title: 'Gulliver Travels',
        words: ['giant', 'gulliver', 'here', 'there', 'tiny', 'travels'] });
      done();
      return app.close();
    });
  });
});
