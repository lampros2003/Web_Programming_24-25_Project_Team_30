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

// Dummy menu items data
const menuItems = [
  {
    id: 1,
    name: 'Creamy Wild Mushroom Soup',
    description: 'A velvety blend of wild mushrooms with truffle oil and fresh herbs.',
    price: '$12',
    category: 'starter',
    image: '/images/menu/mushroom-soup.jpg',
    dietaryRestrictions: ['vegetarian', 'gluten-free']
  },
  {
    id: 2,
    name: 'Mediterranean Bruschetta',
    description: 'Toasted artisan bread topped with diced tomatoes, fresh basil, and balsamic glaze.',
    price: '$10',
    category: 'starter',
    image: '/images/menu/bruschetta.jpg',
    dietaryRestrictions: ['vegan']
  },
  {
    id: 3,
    name: 'Grilled Atlantic Salmon',
    description: 'Fresh salmon fillet with lemon-dill sauce, served with seasonal vegetables.',
    price: '$26',
    category: 'main',
    image: '/images/menu/salmon.jpg',
    dietaryRestrictions: ['gluten-free']
  },
  {
    id: 4,
    name: 'Truffle Risotto',
    description: 'Creamy Arborio rice with wild mushrooms, white truffle oil and aged Parmesan.',
    price: '$22',
    category: 'main',
    image: '/images/menu/risotto.jpg',
    dietaryRestrictions: ['vegetarian']
  },
  {
    id: 5,
    name: 'Grass-Fed Ribeye Steak',
    description: '12oz prime cut steak with red wine reduction and roasted garlic butter.',
    price: '$34',
    category: 'main',
    image: '/images/menu/steak.jpg',
    dietaryRestrictions: []
  },
  {
    id: 6,
    name: 'Vegan Buddha Bowl',
    description: 'Quinoa, roasted vegetables, avocado, and chickpeas with tahini dressing.',
    price: '$18',
    category: 'main',
    image: '/images/menu/buddha-bowl.jpg',
    dietaryRestrictions: ['vegan', 'gluten-free', 'nut-free']
  },
  {
    id: 7,
    name: 'Dark Chocolate Soufflé',
    description: 'Warm chocolate soufflé with a molten center, served with vanilla bean ice cream.',
    price: '$14',
    category: 'dessert',
    image: '/images/menu/chocolate-souffle.jpg',
    dietaryRestrictions: ['vegetarian']
  },
  {
    id: 8,
    name: 'Lemon Tart',
    description: 'Tangy lemon curd in a buttery pastry shell with fresh berries and mint.',
    price: '$10',
    category: 'dessert',
    image: '/images/menu/lemon-tart.jpg',
    dietaryRestrictions: ['vegetarian', 'nut-free']
  }
];

/* GET menu page */
router.get('/menu', function(req, res, next) {
  res.render('menu', { 
    title: 'RESTAURANT', 
    activeTab: 'menu',
    menuItems: menuItems,
    menuCategories: menuCategories
  });
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
