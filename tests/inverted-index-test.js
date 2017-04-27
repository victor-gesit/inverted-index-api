const app = require('../app');
const request = require('supertest')(app);

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
const validJSON = JSON.stringify(validObject);
const expectedResult = {
  an: [0],
  into: [0, 1],
  inquiry: [0],
  is: [0, 1],
  string: [0],
  the: [1],
  this: [0],
  used: [1]
};
const badJSON = 'abc';

describe('Read book data', () => {
  describe('Read book data', () => {
    it('ensures proper response when file is malformed', (done) => {
      request
       .post('/api/create')
       .send(badJSON)
       .expect('Error: malformed JSON')
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
       .expect('Error: invalid file')
       .end((err, res) => {
         if (err) {
           return done(err);
         }
         done();
       });
    });
    it('ensures proper respone when file is empty', (done) => {
      request
        .post('/api/create')
        .send()
        .expect('Error: Empty File')
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
        .send(validJSON)
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
        .send(validJSON)
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
    it('ensures passed in index is in valid format', () => {

    });
    it('ensures index returns the correct result when searched', () => {

    });
    it('ensures searchIndex can handle an array of search items', () => {

    });
    it('ensures searchIndex can handle a varied number of search terms as arguments', () => {

    });
    it('ensures goes through all indexed files if a filename/key is not passed', () => {

    });
  });
});
