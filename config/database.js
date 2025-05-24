const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const { open } = require('sqlite');

// Create database connection using promises
const dbPath = path.resolve(__dirname, '../data/restaurant.db');

// Function to get database connection
async function getDbConnection() {
  return open({
    filename: dbPath,
    driver: sqlite3.Database
  });
}

// Export both the connection function and raw sqlite3 for initialization
module.exports = {
  getDbConnection,
  sqlite3,
  dbPath
};
