var express = require('express');
var router = express.Router();
const reservationsRouter = require('./reservations');

/* GET home page. */
//localhost:3000
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/reservations', reservationsRouter);

module.exports = router;
