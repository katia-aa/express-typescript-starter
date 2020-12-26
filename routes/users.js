var express = require('express')
var router = express.Router()

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('Hello World!')
})

router.get('/cool', function (req, res, next) {
  res.send("YOU'RE SO COOL")
})

module.exports = router
