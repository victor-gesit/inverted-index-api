import async from 'async';
import validateAnUpload from '../src/validate-upload';

const validateUpload = validateAnUpload.validateUpload;

export default {
  appendIndex(req, res, next) {
    async.series([
      (callback) => {
        validateUpload(req, (isValid, createdIndices) => {
         // const indices = createdIndices;
          if (isValid) {
            callback(null, createdIndices);
          } else {
            callback('stop', createdIndices);
          }
        });
      }
    ],
    (err, result) => {
      res.indices = result[0];
      next();
    });
  }
}