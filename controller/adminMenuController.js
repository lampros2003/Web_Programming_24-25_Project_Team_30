const { MenuItem } = require('../models/models');

const adminMenuController = {
  // Display all menu items
  listMenuItems: async (req, res, next) => {
    try {
      const menuItems = await MenuItem.getAll();
      res.render('admin/menu-list', { 
        title: 'Menu Management', 
        menuItems,
        layout: 'layout' // Ensure layout is applied
      });
    } catch (err) {
      next(err);
    }
  },

  // Show form to add a new menu item
  showAddMenuItemForm: (req, res) => {
    res.render('admin/menu-form', { 
      title: 'Add Menu Item',
      item: {}, // Empty item for new form
      action: '/admin/menu/add',
      submitButtonText: 'Add Item',
      layout: 'layout' // Ensure layout is applied
    });
  },

  // Process adding a new menu item
  addMenuItem: async (req, res, next) => {
    try {
      const { name, ingredients, price, category, image, dietary_restrictions } = req.body;
      const available = req.body.available === 'on' || req.body.available === true;
      await MenuItem.create({ 
        name, 
        ingredients, 
        price: parseFloat(price), 
        available, 
        category, 
        image, 
        dietary_restrictions 
      });
      res.redirect('/admin/menu');
    } catch (err) {
      next(err);
    }
  },

  // Show form to edit an existing menu item
  showEditMenuItemForm: async (req, res, next) => {
    try {
      const item = await MenuItem.getById(req.params.id);
      if (!item) {
        return res.status(404).send('Menu item not found');
      }
      res.render('admin/menu-form', { 
        title: 'Edit Menu Item', 
        item, 
        action: `/admin/menu/edit/${item.id}`,
        submitButtonText: 'Update Item',
        layout: 'layout' // Ensure layout is applied
      });
    } catch (err) {
      next(err);
    }
  },

  // Process updating an existing menu item
  updateMenuItem: async (req, res, next) => {
    try {
      const { name, ingredients, price, category, image, dietary_restrictions } = req.body;
      const available = req.body.available === 'on' || req.body.available === true;
      await MenuItem.update(req.params.id, { 
        name, 
        ingredients, 
        price: parseFloat(price), 
        available, 
        category, 
        image, 
        dietary_restrictions 
      });
      res.redirect('/admin/menu');
    } catch (err) {
      next(err);
    }
  },

  // Show delete confirmation page
  showDeleteMenuItemConfirm: async (req, res, next) => {
    try {
      const item = await MenuItem.getById(req.params.id);
      if (!item) {
        return res.status(404).send('Menu item not found');
      }
      res.render('admin/menu-delete-confirm', { 
        title: 'Confirm Delete', 
        item,
        layout: 'layout' // Ensure layout is applied
      });
    } catch (err) {
      next(err);
    }
  },

  // Process deleting a menu item
  deleteMenuItem: async (req, res, next) => {
    try {
      await MenuItem.delete(req.params.id);
      res.redirect('/admin/menu');
    } catch (err) {
      next(err);
    }
  }
};

module.exports = adminMenuController;
