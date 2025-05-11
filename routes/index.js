var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
    title: 'RESTAURANT',
    activeTab: 'about' // Default active tab
  });
});

/* GET about us page */
router.get('/about', function(req, res, next) {
  res.render('index', { 
    title: 'RESTAURANT', 
    activeTab: 'about'
  });
});

/* GET menu page */
router.get('/menu', function(req, res, next) {
  res.render('index', { 
    title: 'RESTAURANT', 
    activeTab: 'menu'
  });
});

/* GET reservations page */
router.get('/reservations', function(req, res, next) {
  res.render('index', { 
    title: 'RESTAURANT', 
    activeTab: 'reservations'
  });
});

module.exports = router;
