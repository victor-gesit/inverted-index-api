import express from 'express';
import multer from 'multer';
import indexer from './indexer';  // Middleware to handle creation of index

const upload = multer({ dest: 'uploads' });
const router = express.Router();

router.post('/', upload.array('files'), indexer.appendIndex, (req, res) => {
  res.send(res.indices);  // indexer middleware appends indices to response object
});

export default router;
