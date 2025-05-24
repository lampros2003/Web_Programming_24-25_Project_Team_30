var express = require('express');
var router = express.Router();

//  require database models 
let MenuItem;
try {
  const models = require('../models/models');
  MenuItem = models.MenuItem;
} catch (error) {
  console.error('Warning: Database models not available:', error.message);
  MenuItem = null;
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
  res.render('reservations', { 
    title: 'RESTAURANT', 
    activeTab: 'reservations'
  });
});

/* POST reservation submission */
router.post('/submit-reservation', function(req, res, next) {
  //we will just log the reservation data to the console for now
  // we can add database logic here later
  console.log('Reservation submitted:', req.body);
  res.redirect('/reservations?success=true');
});

module.exports = router;
