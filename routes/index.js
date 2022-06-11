var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  try{
    res.render('Turnkey', { title: 'Express' });
  }catch(err){
    console.log(err);
  }
  
});

module.exports = router;
