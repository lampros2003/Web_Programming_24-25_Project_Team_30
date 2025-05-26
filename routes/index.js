var express = require('express');
var router = express.Router();

//  require database models 
let MenuItem, Customer, Reservation;
try {
  const models = require('../models/models');
  MenuItem = models.MenuItem;
  Customer = models.Customer;
  Reservation = models.Reservation;
} catch (error) {
  console.error('Warning: Database models not available:', error.message);
  MenuItem = null;
  Customer = null;
  Reservation = null;
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
    title: 'RESTAURANT',
    // Default tab
    activeTab: 'about' 

  });
});

/* GET about us page */
router.get('/about', function(req, res, next) {
  res.render('about', { 
    title: 'RESTAURANT', 
    activeTab: 'about'
  });
});

// Menu categories
const menuCategories = [
  { id: 'starter', name: 'Starters' },
  { id: 'main', name: 'Main Courses' },
  { id: 'dessert', name: 'Desserts' }
];

/* GET menu page */
router.get('/menu', async function(req, res, next) {
  try {
    let menuItems = [];
    
    if (MenuItem) {
      const dbItems = await MenuItem.getAll();
      
      // Transform database items to menu items
      menuItems = dbItems.map(item => ({
        id: item.id,
        name: item.name,
        description: item.ingredients || 'No description available',
        price: `$${item.price}`,
        category: item.category || 'main',
        image: item.image || '/images/menu/default-dish.jpg',
        dietaryRestrictions: item.dietary_restrictions ? item.dietary_restrictions.split(',').filter(r => r.trim()) : []
      }));
    } else {
      console.log('Database not available, using fallback  menu');
    }

    res.render('menu', { 
      title: 'RESTAURANT', 
      activeTab: 'menu',
      menuItems: menuItems,
      menuCategories: menuCategories
    });
  } catch (err) {
    console.error('Error loading menu:', err);
    // Render menu with empty items if database fails
    res.render('menu', { 
      title: 'RESTAURANT', 
      activeTab: 'menu',
      menuItems: [],
      menuCategories: menuCategories
    });
  }
});

/* GET reservations page */
router.get('/reservations', function(req, res, next) {
  const success = req.query.success === 'true';
  const error = req.query.error;
  const reservationCode = req.query.code;
  
  res.render('reservations', { 
    title: 'RESTAURANT', 
    activeTab: 'reservations',
    success: success,
    error: error,
    reservationCode: reservationCode
  });
});

//generate reservation code to edit reservations later
function generateReservationCode() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/* POST reservation submission */
router.post('/submit-reservation', async function(req, res, next) {
  try {
    const { date, time, people, area, name, phone } = req.body;
    
    // Validate
    if (!date || !time || !people || !name || !phone) {
      return res.redirect('/reservations?error=Please fill in all required fields');
    }
    

    
    if (!Customer || !Reservation) {
      console.log('Database not available, logging reservation:', req.body);
      return res.redirect('/reservations?error=Database is down. Please try again later.');
    }
    
    // Create or find customer
    let customer;
    try {
      customer = await Customer.create({
        name: name.trim(),
        phone: phone.trim()
      });
    } catch (error) {
      
      console.log('Customer creation note:', error.message);
  
     
      customer = await Customer.create({
        name: name.trim(),
        phone: phone.trim()
      });

    }
    
    // Generate reservation code
    const reservationCode = generateReservationCode();
    
    // Create reservation
    const reservation = await Reservation.create({
      table_id: null, // Will be assigned by staff
      customer_id: customer.lastID || customer.id,
      reservation_date: date,
      reservation_time: time,
      party_size: parseInt(people),
      code: reservationCode
    });
    console.log('Reservation created successfully:', {
      code: reservationCode,
      customer: name,
      date: date,
      time: time,
      people: people,
      area: area
    });
    
    res.redirect(`/reservations?success=true&code=${reservationCode}`);
    
  } catch (error) {
    console.error('Error creating reservation:', error);
    res.redirect('/reservations?error=Unable to create reservation. Please try again.');
  }
});

module.exports = router;
