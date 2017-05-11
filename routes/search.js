import express from 'express';
import bodyParser from 'body-parser';
import searchWare from '../middlewares/search-middleware';  // Middleware to handle search

const router = express.Router();
// Middlewares
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

router.post('/', searchWare.appendResult, (req, res) => {
  res.send(res.searchResult);
});

export default router;
