var express = require('express');
var router = express.Router();
const fs = require('fs');
const path = require('path');
const { MenuItem, Table, Customer, Reservation, Employee, Session } = require('../models/models');
const {LogInForm,doLogin,checkAuthenticated,Logout} = require("../controller/login-controller.js");

// Admin dashboard
router.get('/',function (req,res,next){res.redirect('login');});
router.get('/dashboard',checkAuthenticated);
router.get('/tables',checkAuthenticated);
router.get('/logout',Logout);

router.get('/dashboard', function(req, res, next) {
  const date = new Date();
  let currentMonth = date.getMonth();
  const monthNames =["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];
  currentMonth = monthNames[currentMonth];
  let monthsData = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/months.json'), 'utf8'));

  monthData = monthsData[currentMonth]
  res.render( 'dashboard',{period:currentMonth,first_day: monthData.first_day,
    total_days: monthData.total_days});
});
router.post('/dashboard', function(req, res, next) {
  const month = req.body.months
  let monthsData = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/months.json'), 'utf8'));

  monthData = monthsData[month]

  res.render( 'dashboard',
      {period: month,
      first_day: monthData.first_day,
      total_days: monthData.total_days}
);
});


// Menu management
router.get('/menu', async function(req, res, next) {
  try {
   
  } catch (err) {
    next(err);
  }
});

// Add new menu item
router.get('/menu/add', function(req, res, next) {
  res.render('admin/menu-add', { title: 'Add Menu Item' });
});

router.post('/menu/add', async function(req, res, next) {
  try {
 
  } catch (err) {
    next(err);
  }
});

// Edit menu item
router.get('/menu/edit/:id', async function(req, res, next) {
  try {
    
  } catch (err) {
    next(err);
  }
});

router.post('/menu/edit/:id', async function(req, res, next) {
  try {
    await MenuItem.update(req.params.id, req.body);
    res.redirect('/admin/menu');
  } catch (err) {
    next(err);
  }
});

// Delete menu item
router.get('/menu/delete/:id', async function(req, res, next) {
  try {
    
  } catch (err) {
    next(err);
  }
});

router.post('/menu/delete/:id', async function(req, res, next) {
  try {

  } catch (err) {
    next(err);
  }
});

// Reservations management
router.get('/reservations', async function(req, res, next) {
  try {
    
  } catch (err) {
    next(err);
  }
});

// User management
router.get('/users', async function(req, res, next) {
  try {
   
  } catch (err) {
    next(err);
  }
});

router.get('/tables', async function(req, res, next) {
  try {
    res.render('tables')

  } catch (err) {
    next(err);
  }
});

router.get('/login', LogInForm)
router.post('/login', doLogin)
module.exports = router;