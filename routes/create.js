import express from 'express';
import multer from 'multer';
import fs from 'fs';
import async from 'async';
import fileHandler from '../src/file-handler';
import InvertedIndex from '../src/inverted-index';
import validateUpload from '../src/validate-upload';
const upload = multer({ dest: 'uploads' });
const router = express.Router();
const invertedIndex = new InvertedIndex();

router.post('/', upload.array('files'), (req, res) => {
  const indices = {};

/*
  const files = req.files;
  // Check that files were uploaded
  if (files === undefined || files.length === 0) {
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
      // fs.unlink(filePath);  // Delete temporary file
      indices[originalFileName] = { error: 'invalid file type' };
      // Check to see if this is the last file
      if (count === files.length) {
        return res.send(indices);
      }
      return;
    }
    // Read file from temporary storage
    fileHandler.getContent(filePath, (err, content) => {
      if (err) {
        count += 1;
        indices[originalFileName] = err.msg;
        // Check to see if this is the last file
        if (count === files.length) {
          return res.send(indices);
        }
        return; // Continue looping through books
      }
      let index = {};
      count += 1;
      async.series([
        (callback) => {
          valid = validateUpload(req, )
        },
        (callback) => {
          index = invertedIndex.createIndex(originalFileName, content);
          callback(null);
        },
        () => {
          indices[originalFileName] = index[originalFileName];
          // Check to see if last file is indexed
          if (count === files.length) {
            return res.send(indices);
          }
        }
      ]);
    });
  }); */
/*
  async.series([
    (callback) => {
      validateUpload(req, (isValid, indices) => {
        if(isValid) {
          callback(null, indices);
        } else {
          callback('stop', indices);
        }
      });
    }
  ],
  (err, result) => {
    res.send(result[1]);
  }*/
});

export default router;
