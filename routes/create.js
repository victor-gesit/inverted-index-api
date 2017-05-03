import express from 'express';
import multer from 'multer';
import fileHandler from '../src/file-handler';

const upload = multer({ dest: 'uploads' });

const router = express.Router();
const InvertedIndex = require('../src/inverted-index');

router.post('/', upload.single('file'), (req, res) => {
  const originalFileName = req.file.originalname;
  // Check for valid file type
  const fileExtension = (originalFileName.split('.').pop()).toUpperCase();
  if (fileExtension !== 'JSON') {
    return res.send({ error: 'invalid file type' });
  }

  const filePath = req.file.path;
  // Read file from temporary storage
  fileHandler.getContent(filePath, (err, content) => {
    if (err) {
      return res.send(err.msg);
    }
    InvertedIndex.createIndex(originalFileName, content, (indices) => {
      res.send(indices);
    });
  });
});

router.get('/', (req, res) => {
  res.send('Get method working for create route');
});
module.exports = router;
