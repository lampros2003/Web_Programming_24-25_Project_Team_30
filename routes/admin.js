var express = require('express');
var router = express.Router();
const fs = require('fs');
const path = require('path');
const { MenuItem, Table, Customer, Reservation, Employee, Session } = require('../models/models');
const {LogInForm,doLogin,checkAuthenticated,Logout} = require("../controller/login-controller.js");
const {Dashboard_manager} = require("../controller/dashboard-conroller.js");

router.get('/',function (req,res,next){res.redirect('login');});
router.get('/dashboard',checkAuthenticated);
router.get('/tables',checkAuthenticated);
router.get('/logout',Logout);

// Admin dashboard
router.get('/dashboard',Dashboard_manager);


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