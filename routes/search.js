import express from 'express';
import async from 'async';
import bodyParser from 'body-parser';
import InvertedIndex from '../src/inverted-index';


const router = express.Router();


router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));
router.post('/', (req, res) => {
  const index = req.body.index,
    terms = req.body.terms;
  let searchResults = {};

  async.series([
    (callback) => {
      searchResults = InvertedIndex.searchIndex(index, 'book1.json', ...terms);
      callback(null);
    },
    () => {
      res.send(searchResults);
    }
  ]);
});

router.get('/', (req, res) => {
  res.send('Search get route working');
});
module.exports = router;
