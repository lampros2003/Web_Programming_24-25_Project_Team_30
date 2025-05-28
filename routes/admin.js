var express = require('express');
var router = express.Router();
const fs = require('fs');
const path = require('path');
const { MenuItem, Table, Customer, Reservation, Employee, Session } = require('../models/models');
const {LogInForm,doLogin,checkAuthenticated,Logout} = require("../controller/login-controller.js");
const {Dashboard_manager} = require("../controller/dashboard-conroller.js");
const adminMenuController = require('../controller/adminMenuController.js'); // Add this line

router.get('/',function (req,res,next){res.redirect('login');});
router.get('/dashboard',checkAuthenticated);
router.get('/tables',checkAuthenticated);
router.get('/logout',Logout);

// Admin dashboard
router.get('/dashboard',Dashboard_manager);


// Menu management
router.get('/menu', checkAuthenticated, adminMenuController.listMenuItems);

// Add new menu item
router.get('/menu/add', checkAuthenticated, adminMenuController.showAddMenuItemForm);

router.post('/menu/add', checkAuthenticated, adminMenuController.addMenuItem);

// Edit menu item
router.get('/menu/edit/:id', checkAuthenticated, adminMenuController.showEditMenuItemForm);

router.post('/menu/edit/:id', checkAuthenticated, adminMenuController.updateMenuItem);

// Delete menu item
router.get('/menu/delete/:id', checkAuthenticated, adminMenuController.showDeleteMenuItemConfirm);

router.post('/menu/delete/:id', checkAuthenticated, adminMenuController.deleteMenuItem);

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