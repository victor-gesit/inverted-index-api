import async from 'async';
import validateAnUpload from '../src/validate-upload';

const validateUpload = validateAnUpload.validateUpload;
// This middleware appends the created index to the response object
export default {
  appendIndex(req, res, next) {
    async.series([
      (callback) => {
        validateUpload(req, (isValid, createdIndices) => {
          if (isValid) {
            callback(null, createdIndices);
          } else {
            callback('stop', createdIndices);
          }
        });
      }
    ],
    (err, result) => {
      // Append the indices generated
      res.indices = result[0];
      next();
    });
  }
};
