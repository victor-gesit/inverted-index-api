import express from 'express';
import multer from 'multer';
import fileHandler from '../src/file-handler';

const upload = multer({ dest: 'uploads' });

const router = express.Router();
const InvertedIndex = require('../src/inverted-index');

router.post('/', upload.single('file'), (req, res) => {
  const originalFileName = req.file.originalname;
  const fileName = req.file.filename;
  console.log(req.file.originalname);
  fileHandler.getContent(`uploads/${fileName}`, (err, content) => {
    if (err) {
      return res.send({ error: 'malformed json' });
    }
    if (content === null) {
      return res.send({ error: 'empty file' });
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
