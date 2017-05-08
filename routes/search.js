import express from 'express';
import bodyParser from 'body-parser';
import searcher from './searcher';  // Middleware to handle search

const router = express.Router();
// Middlewares
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

router.post('/', searcher.appendResult, (req, res) => {
  res.send(res.searchResult);
});

export default router;
