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
  const updated = req.query.updated === 'true';
  const cancelled = req.query.cancelled === 'true';
  
  res.render('reservations', { 
    title: 'RESTAURANT', 
    activeTab: 'reservations',
    success: success,
    error: error,
    reservationCode: reservationCode,
    updated: updated,
    cancelled: cancelled
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
    
    // Validate required fields
    if (!date || !time || !people || !name || !phone) {
      return res.redirect('/reservations?error=Please fill in all required fields');
    }
    
    // Validate date range (2 days to 2 months from now)
    const reservationDate = new Date(date);
    const today = new Date();
    const twoDaysFromNow = new Date(today);
    twoDaysFromNow.setDate(today.getDate() + 2);
    const twoMonthsFromNow = new Date(today);
    twoMonthsFromNow.setMonth(today.getMonth() + 2);
    
    if (reservationDate < twoDaysFromNow) {
      return res.redirect('/reservations?error=Reservations must be made at least 2 days in advance.');
    }
    
    if (reservationDate > twoMonthsFromNow) {
      return res.redirect('/reservations?error=Reservations can only be made up to 2 months in advance.');
    }
    
    // Validate time format (should be in format "10:00", "11:00", etc.)
    const timeRegex = /^([1-2][0-9]):00$/;
    if (!timeRegex.test(time)) {
      return res.redirect('/reservations?error=Please select a valid hour between 10 AM and 11 PM.');
    }
    
    const hour = parseInt(time.split(':')[0]);
    if (hour < 10 || hour > 23) {
      return res.redirect('/reservations?error=Restaurant hours are from 10 AM to 11 PM.');
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

/* POST lookup reservation by code */
router.post('/lookup-reservation', async function(req, res, next) {
  try {
    const { reservationCode } = req.body;
    
    if (!reservationCode) {
      return res.redirect('/reservations?error=Please enter a reservation code');
    }
    
    if (!Reservation || !Customer) {
      return res.redirect('/reservations?error=Database is down. Please try again later.');
    }
    
    const reservation = await Reservation.getByCode(reservationCode.trim().toUpperCase());
    
    if (!reservation) {
      return res.redirect('/reservations?error=Reservation not found. Please check your code.');
    }
    
    // Check if reservation is at least 2 days in the future
    const reservationDate = new Date(reservation.reservation_date);
    const today = new Date();
    const twoDaysFromNow = new Date(today);
    twoDaysFromNow.setDate(today.getDate() + 2);
    
    if (reservationDate < twoDaysFromNow) {
      return res.redirect('/reservations?error=Reservations can only be modified or cancelled if they are at least 2 days in the future.');
    }
    
    // Get customer information
    const customer = await Customer.getById(reservation.customer_id);
    
    res.render('reservations', {
      title: 'RESTAURANT',
      activeTab: 'reservations',
      editMode: true,
      reservation: reservation,
      customer: customer
    });
    
  } catch (error) {
    console.error('Error looking up reservation:', error);
    res.redirect('/reservations?error=Unable to lookup reservation. Please try again.');
  }
});

/* POST update existing reservation */
router.post('/update-reservation', async function(req, res, next) {
  try {
    const { reservationId, date, time, people, area, name, phone } = req.body;
    
    // Validate required fields
    if (!reservationId || !date || !time || !people || !name || !phone) {
      return res.redirect('/reservations?error=Please fill in all required fields');
    }
    
    if (!Customer || !Reservation) {
      return res.redirect('/reservations?error=Database is down. Please try again later.');
    }
    
    // Get the existing reservation
    const existingReservation = await Reservation.getById(reservationId);
    if (!existingReservation) {
      return res.redirect('/reservations?error=Reservation not found.');
    }
    
    // Check if reservation is still at least 2 days in the future
    const reservationDate = new Date(date);
    const today = new Date();
    const twoDaysFromNow = new Date(today);
    twoDaysFromNow.setDate(today.getDate() + 2);
    
    if (reservationDate < twoDaysFromNow) {
      return res.redirect('/reservations?error=Reservations can only be modified if they are at least 2 days in the future.');
    }
    
    // Check if reservation date is not more than 2 months from now
    const twoMonthsFromNow = new Date(today);
    twoMonthsFromNow.setMonth(today.getMonth() + 2);
    
    if (reservationDate > twoMonthsFromNow) {
      return res.redirect('/reservations?error=Reservations can only be made up to 2 months in advance.');
    }
    
    // Update customer information
    await Customer.update(existingReservation.customer_id, {
      name: name.trim(),
      phone: phone.trim()
    });
    
    // Update reservation
    await Reservation.update(reservationId, {
      table_id: existingReservation.table_id,
      customer_id: existingReservation.customer_id,
      reservation_date: date,
      reservation_time: time,
      party_size: parseInt(people),
      code: existingReservation.code
    });
    
    console.log('Reservation updated successfully:', {
      id: reservationId,
      code: existingReservation.code,
      customer: name,
      date: date,
      time: time,
      people: people,
      area: area
    });
    
    res.redirect(`/reservations?success=true&code=${existingReservation.code}&updated=true`);
    
  } catch (error) {
    console.error('Error updating reservation:', error);
    res.redirect('/reservations?error=Unable to update reservation. Please try again.');
  }
});

/* POST cancel existing reservation */
router.post('/cancel-reservation', async function(req, res, next) {
  try {
    const { reservationId } = req.body;
    
    if (!reservationId) {
      return res.redirect('/reservations?error=Invalid reservation.');
    }
    
    if (!Reservation) {
      return res.redirect('/reservations?error=Database is down. Please try again later.');
    }
    
    // Get the existing reservation
    const existingReservation = await Reservation.getById(reservationId);
    if (!existingReservation) {
      return res.redirect('/reservations?error=Reservation not found.');
    }
    
    // Check if reservation is still at least 2 days in the future
    const reservationDate = new Date(existingReservation.reservation_date);
    const today = new Date();
    const twoDaysFromNow = new Date(today);
    twoDaysFromNow.setDate(today.getDate() + 2);
    
    if (reservationDate < twoDaysFromNow) {
      return res.redirect('/reservations?error=Reservations can only be cancelled if they are at least 2 days in the future.');
    }
    
    // Cancel the reservation (soft delete)
    await Reservation.softDelete(reservationId);
    
    console.log('Reservation cancelled successfully:', {
      id: reservationId,
      code: existingReservation.code
    });
    
    res.redirect('/reservations?success=true&cancelled=true');
    
  } catch (error) {
    console.error('Error cancelling reservation:', error);
    res.redirect('/reservations?error=Unable to cancel reservation. Please try again.');
  }
});

module.exports = router;
