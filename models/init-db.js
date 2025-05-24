const { getDbConnection, sqlite3 } = require('../config/database');
const fs = require('fs');
const path = require('path');

// Ensure data directory exists
const dataDir = path.resolve(__dirname, '../data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Initialize database tables using async/await
async function initializeDatabase() {
  try {
    const db = await getDbConnection();
    
    // Create tables based on ERD
    await db.exec(`
      CREATE TABLE IF NOT EXISTS tables (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        shape TEXT,
        table_number INTEGER NOT NULL UNIQUE,
        capacity INTEGER NOT NULL,
        location TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await db.exec(`
      CREATE TABLE IF NOT EXISTS customers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        phone TEXT NOT NULL UNIQUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await db.exec(`
      CREATE TABLE IF NOT EXISTS reservations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        table_id INTEGER,
        customer_id INTEGER,
        reservation_date DATE NOT NULL,
        reservation_time TIME NOT NULL,
        party_size INTEGER NOT NULL,
        code TEXT UNIQUE,
        deleted_at TIMESTAMP NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (table_id) REFERENCES tables (id),
        FOREIGN KEY (customer_id) REFERENCES customers (id)
      )
    `);

    await db.exec(`
      CREATE TABLE IF NOT EXISTS employees (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        code TEXT NOT NULL UNIQUE,
        role TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await db.exec(`
      CREATE TABLE IF NOT EXISTS sessions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        employee_id INTEGER NOT NULL,
        start_datetime TIMESTAMP NOT NULL,
        end_datetime TIMESTAMP,
        device TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (employee_id) REFERENCES employees (id)
      )
    `);

    await db.exec(`
      CREATE TABLE IF NOT EXISTS menu_items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        ingredients TEXT,
        price DECIMAL(10,2) NOT NULL,
        available BOOLEAN DEFAULT 1,
        category TEXT DEFAULT 'main',
        image TEXT DEFAULT '/images/menu/default-dish.jpg',
        dietary_restrictions TEXT DEFAULT '',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await db.close();
    console.log("Database tables created successfully");
    return true;
  } catch (err) {
    console.error("Error initializing database:", err);
    throw err;
  }
}

// Export function for use in app initialization
module.exports = {
  initializeDatabase
};
