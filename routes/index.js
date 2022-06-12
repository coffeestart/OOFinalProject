var express = require('express');
var router = express.Router();
//const welcome = require('../public/js/welcome');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('Turnkey', { 
      title: 'Index',
    });
});

router.get('/MiTMSTP2AP01', function(req, res, next) {
  res.render('MiTMSTP2AP01', { title: 'MiTMSTP2AP01' });
});

router.get('/MiTMSTP2NFS', function(req, res, next) {
  res.render('MiTMSTP2NFS', { title: 'MiTMSTP2NFS' });
});

router.get('/Turnkey', function(req, res, next) {
  res.render('Turnkey', { 
    title: 'Index', 
  });
});

router.get('/TurnkeyLogTask', function(req, res, next) {
  res.render('TurnkeyLogTask', { title: 'TurnkeyLogTask' });
});

router.get('/WriteInvoiceInfoTask', function(req, res, next) {
  res.render('WriteInvoiceInfoTask', { title: 'WriteInvoiceInfoTask' });
});

module.exports = router;
