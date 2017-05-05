import express from 'express';
import multer from 'multer';
import fs from 'fs';
import fileHandler from '../src/file-handler';

const upload = multer({ dest: 'uploads' });

const router = express.Router();
const InvertedIndex = require('../src/inverted-index');

const invertedIndex = new InvertedIndex();

router.post('/', upload.single('file'), (req, res) => {
  // Check that file was uploaded
  if (req.file === undefined) {
    return res.send({ error: 'no file uploaded' });
  }
  const originalFileName = req.file.originalname;
  const filePath = req.file.path;

  // Check for valid file type
  const fileExtension = (originalFileName.split('.').pop()).toUpperCase();
  if (fileExtension !== 'JSON') {
    fs.unlink(filePath);  // Delete temporary file
    return res.send({ error: 'invalid file type' });
  }
  // Read file from temporary storage
  fileHandler.getContent(filePath, (err, content) => {
    if (err) {
      return res.send(err.msg);
    }
    invertedIndex.createIndex(originalFileName, content, (indices) => {
      res.send(indices);
    });
  });
});

module.exports = router;
