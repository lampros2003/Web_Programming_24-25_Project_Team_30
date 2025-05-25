#!/usr/bin/env node

// Check for required dependencies first
console.log('Verifying database dependencies...');
try {
  require('sqlite3');
  require('sqlite');
  console.log('Database dependencies verified successfully');
} catch (error) {
  console.error('Error: Required database dependencies are missing.');
  console.error('Please run "npm install" to install all dependencies.');
  console.error('Missing dependency:', error.message);
  console.error('\nYou may need to run: npm install sqlite3 sqlite');
  process.exit(1);
}

// Script to initialize the database
const { initializeDatabase } = require('../models/init-db');
const { getDbConnection } = require('../config/database');

// Main function to initialize database
async function initializeApp() {
  console.log('Initializing database...');
  try {
    await initializeDatabase();
    await insertDemoData();
    console.log('Database initialization completed successfully');
    process.exit(0);
  } catch (err) {
    console.error('Error initializing database:', err);
    console.error('\nThis might be due to missing dependencies or database permissions.');
    
   
    process.exit(1);
  }
}

// Add some demo data
async function insertDemoData() {
  console.log('Inserting demo data...');
  const db = await getDbConnection();
  
  try {
    // Clear existing data to avoid duplicates
    console.log('Clearing existing data...');
    try {
      await db.run("DELETE FROM menu_items");
      await db.run("DELETE FROM tables"); 
      await db.run("DELETE FROM employees");
    } catch (err) {
      console.log('Note: Tables may not exist yet, continuing with fresh setup...');
    }

    // Add tables
    await db.run("INSERT INTO tables (shape, table_number, capacity, location) VALUES (?, ?, ?, ?)", 
      ['round', 1, 4, 'window']);
    await db.run("INSERT INTO tables (shape, table_number, capacity, location) VALUES (?, ?, ?, ?)", 
      ['square', 2, 2, 'corner']);
    await db.run("INSERT INTO tables (shape, table_number, capacity, location) VALUES (?, ?, ?, ?)", 
      ['rectangular', 3, 6, 'center']);

    // Add comprehensive menu items with categories, images, and dietary restrictions
    await db.run("INSERT INTO menu_items (name, ingredients, price, available, category, image, dietary_restrictions) VALUES (?, ?, ?, ?, ?, ?, ?)",
      ['Creamy Wild Mushroom Soup', 'Wild mushrooms, cream, truffle oil, fresh herbs, garlic', 12.99, 1, 'starter', '/images/menu/mushroom-soup.jpg', 'vegetarian,gluten-free']);
    await db.run("INSERT INTO menu_items (name, ingredients, price, available, category, image, dietary_restrictions) VALUES (?, ?, ?, ?, ?, ?, ?)",
      ['Mediterranean Bruschetta', 'Artisan bread, tomatoes, basil, balsamic glaze, olive oil', 9.99, 1, 'starter', '/images/menu/bruschetta.jpg', 'vegan']);
    await db.run("INSERT INTO menu_items (name, ingredients, price, available, category, image, dietary_restrictions) VALUES (?, ?, ?, ?, ?, ?, ?)",
      ['Caesar Salad', 'Romaine lettuce, parmesan cheese, croutons, caesar dressing', 11.50, 1, 'starter', '/images/menu/caesar-salad.jpg', 'vegetarian']);
    await db.run("INSERT INTO menu_items (name, ingredients, price, available, category, image, dietary_restrictions) VALUES (?, ?, ?, ?, ?, ?, ?)",
      ['Grilled Atlantic Salmon', 'Fresh salmon fillet, lemon-dill sauce, seasonal vegetables', 26.99, 1, 'main', '/images/menu/salmon.jpg', 'gluten-free']);
    await db.run("INSERT INTO menu_items (name, ingredients, price, available, category, image, dietary_restrictions) VALUES (?, ?, ?, ?, ?, ?, ?)",
      ['Truffle Risotto', 'Arborio rice, wild mushrooms, white truffle oil, aged Parmesan', 22.50, 1, 'main', '/images/menu/risotto.jpg', 'vegetarian']);
    await db.run("INSERT INTO menu_items (name, ingredients, price, available, category, image, dietary_restrictions) VALUES (?, ?, ?, ?, ?, ?, ?)",
      ['Grass-Fed Ribeye Steak', '12oz prime ribeye, red wine reduction, roasted garlic butter', 34.99, 1, 'main', '/images/menu/steak.jpg', '']);
    await db.run("INSERT INTO menu_items (name, ingredients, price, available, category, image, dietary_restrictions) VALUES (?, ?, ?, ?, ?, ?, ?)",
      ['Vegan Buddha Bowl', 'Quinoa, roasted vegetables, avocado, chickpeas, tahini dressing', 18.99, 1, 'main', '/images/menu/buddha-bowl.jpg', 'vegan,gluten-free,nut-free']);
    await db.run("INSERT INTO menu_items (name, ingredients, price, available, category, image, dietary_restrictions) VALUES (?, ?, ?, ?, ?, ?, ?)",
      ['Margherita Pizza', 'San Marzano tomatoes, fresh mozzarella, basil, olive oil', 16.99, 1, 'main', '/images/menu/pizza.jpg', 'vegetarian']);
    await db.run("INSERT INTO menu_items (name, ingredients, price, available, category, image, dietary_restrictions) VALUES (?, ?, ?, ?, ?, ?, ?)",
      ['Dark Chocolate Soufflé', 'Belgian dark chocolate, vanilla bean ice cream, berry coulis', 14.99, 1, 'dessert', '/images/menu/chocolate-souffle.jpg', 'vegetarian']);
    await db.run("INSERT INTO menu_items (name, ingredients, price, available, category, image, dietary_restrictions) VALUES (?, ?, ?, ?, ?, ?, ?)",
      ['Lemon Tart', 'Tangy lemon curd, buttery pastry shell, fresh berries, mint', 10.99, 1, 'dessert', '/images/menu/lemon-tart.jpg', 'vegetarian,nut-free']);
    await db.run("INSERT INTO menu_items (name, ingredients, price, available, category, image, dietary_restrictions) VALUES (?, ?, ?, ?, ?, ?, ?)",
      ['Tiramisu', 'Ladyfingers, mascarpone, espresso, cocoa powder', 12.50, 1, 'dessert', '/images/menu/tiramisu.jpg', 'vegetarian']);

    // Add employees
    await db.run("INSERT INTO employees (name, code, role) VALUES (?, ?, ?)",
      ['Admin User', 'admin123', 'administrator']);
    await db.run("INSERT INTO employees (name, code, role) VALUES (?, ?, ?)",
      ['Waiter One', 'waiter123', 'waiter']);

    console.log('Demo data inserted successfully');
    console.log('Menu items added: 12 items including appetizers, mains, and desserts');
  } finally {
    await db.close();
  }
}

// Run the initialization
initializeApp();
