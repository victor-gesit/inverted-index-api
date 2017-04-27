const express = require('express');

const router = express.Router();

router.post('/', (req, res) => {
  res.send('Working');
});

router.get('/', (req, res) => {
  res.send('Get method working for create route')
})
module.exports = router;
