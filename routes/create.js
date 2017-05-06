import express from 'express';
import multer from 'multer';
import fs from 'fs';
import async from 'async';
import fileHandler from '../src/file-handler';

const upload = multer({ dest: 'uploads' });

const router = express.Router();
const InvertedIndex = require('../src/inverted-index');

const invertedIndex = new InvertedIndex();

router.post('/', upload.array('files'), (req, res) => {
  const indices = {};
  const files = req.files;
  // Check that files were uploaded
  if (files === undefined) {
    return res.send({ error: 'no file uploaded' });
  }
  let count = 0;  // Keep count of number of indexed files
  files.forEach((file) => {
    const originalFileName = file.originalname;
    const filePath = file.path;

    // Check for valid file type
    const fileExtension = (originalFileName.split('.').pop()).toUpperCase();
    if (fileExtension !== 'JSON') {
      count += 1;
      fs.unlink(filePath);  // Delete temporary file
      indices[originalFileName] = { error: 'invalid file type' };
      return;// res.send({ error: 'invalid file type' });
    }
    // Read file from temporary storage
    fileHandler.getContent(filePath, (err, content) => {
      if (err) {
        count += 1;
        indices[originalFileName] = err.msg;
        return; // res.send(err.msg);
      }
      let index = {};
      count += 1;
      async.series([
        (callback) => {
          index = invertedIndex.createIndex(originalFileName, content);
          callback(null);
        },
        (callback) => {
          indices[originalFileName] = index[originalFileName];
          // Check to see if last file is indexed
          if (count === files.length) {
            return res.send(indices);
          }
        }
      ]);
    });
  });
});

module.exports = router;
