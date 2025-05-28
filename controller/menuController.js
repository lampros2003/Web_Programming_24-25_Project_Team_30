// Menu categories
const menuCategories = [
  { id: 'starter', name: 'Starters' },
  { id: 'main', name: 'Main Courses' },
  { id: 'dessert', name: 'Desserts' }
];

// Get database models with error handling
let MenuItem;
try {
  const models = require('../models/models');
  MenuItem = models.MenuItem;
} catch (error) {
  console.error('Warning: Database models not available:', error.message);
  MenuItem = null;
}

const menuController = {
  // GET menu page
  getMenuPage: async (req, res, next) => {
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
        console.log('Database not available, using fallback menu');
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
  }
};

module.exports = menuController;
