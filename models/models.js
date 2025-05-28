const { getDbConnection } = require('../config/database');

// Table models
const Table = {
  // Get all tables
  async getAll() {
    const db = await getDbConnection();
    try {
      return await db.all("SELECT * FROM tables");
    } finally {
      await db.close();
    }
  },
  
  // Get table by ID
  async getById(id) {
    const db = await getDbConnection();
    try {
      return await db.get("SELECT * FROM tables WHERE id = ?", [id]);
    } finally {
      await db.close();
    }
  },
  
  // Create a new table
  async create(tableData) {
    const { shape, table_number, capacity, location } = tableData;
    const db = await getDbConnection();
    try {
      const result = await db.run(
        "INSERT INTO tables (shape, table_number, capacity, location) VALUES (?, ?, ?, ?)",
        [shape, table_number, capacity, location]
      );
      return result;
    } finally {
      await db.close();
    }
  },
  
  // Update table
  async update(id, tableData) {
    const { shape, table_number, capacity, location } = tableData;
    const db = await getDbConnection();
    try {
      return await db.run(
        "UPDATE tables SET shape = ?, table_number = ?, capacity = ?, location = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?",
        [shape, table_number, capacity, location, id]
      );
    } finally {
      await db.close();
    }
  },
  
  // Delete table
  async delete(id) {
    const db = await getDbConnection();
    try {
      return await db.run("DELETE FROM tables WHERE id = ?", [id]);
    } finally {
      await db.close();
    }
  }
};

// Customer model
const Customer = {
  // Get all customers
  async getAll() {
    const db = await getDbConnection();
    try {
      return await db.all("SELECT * FROM customers");
    } finally {
      await db.close();
    }
  },
  
  // Get customer by ID
  async getById(id) {
    const db = await getDbConnection();
    try {
      return await db.get("SELECT * FROM customers WHERE id = ?", [id]);
    } finally {
      await db.close();
    }
  },
  
  // Create customer
  async create(customerData) {
    const { name, phone } = customerData;
    const db = await getDbConnection();
    try {
      return await db.run(
        "INSERT INTO customers (name, phone) VALUES (?, ?)",
        [name, phone]
      );
    } finally {
      await db.close();
    }
  },
  
  // Update customer
  async update(id, customerData) {
    const { name, phone } = customerData;
    const db = await getDbConnection();
    try {
      return await db.run(
        "UPDATE customers SET name = ?, phone = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?",
        [name, phone, id]
      );
    } finally {
      await db.close();
    }
  },
  
  // Delete customer
  async delete(id) {
    const db = await getDbConnection();
    try {
      return await db.run("DELETE FROM customers WHERE id = ?", [id]);
    } finally {
      await db.close();
    }
  }
};

// Reservation models
const Reservation = {
  // Get all reservations
  async getAll() {
    const db = await getDbConnection();
    try {
      return await db.all("SELECT * FROM reservations WHERE deleted_at IS NULL");
    } finally {
      await db.close();
    }
  },
  
  // Get reservation by ID
  async getById(id) {
    const db = await getDbConnection();
    try {
      return await db.get("SELECT * FROM reservations WHERE id = ? AND deleted_at IS NULL", [id]);
    } finally {
      await db.close();
    }
  },
  
  // Get reservation by code
  async getByCode(code) {
    const db = await getDbConnection();
    try {
      return await db.get("SELECT * FROM reservations WHERE code = ? AND deleted_at IS NULL", [code]);
    } finally {
      await db.close();
    }
  },
  
  // Create a new reservation
  async create(reservationData) {
    const { table_id, customer_id, reservation_date, reservation_time, party_size, code } = reservationData;
    const db = await getDbConnection();
    try {
      return await db.run(
        "INSERT INTO reservations (table_id, customer_id, reservation_date, reservation_time, party_size, code) VALUES (?, ?, ?, ?, ?, ?)",
        [table_id, customer_id, reservation_date, reservation_time, party_size, code]
      );
    } finally {
      await db.close();
    }
  },
  
  // Update reservation
  async update(id, reservationData) {
    const { table_id, customer_id, reservation_date, reservation_time, party_size, code } = reservationData;
    const db = await getDbConnection();
    try {
      return await db.run(
        "UPDATE reservations SET table_id = ?, customer_id = ?, reservation_date = ?, reservation_time = ?, party_size = ?, code = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?",
        [table_id, customer_id, reservation_date, reservation_time, party_size, code, id]
      );
    } finally {
      await db.close();
    }
  },
  
  // Soft delete reservation
  async softDelete(id) {
    const db = await getDbConnection();
    try {
      return await db.run(
        "UPDATE reservations SET deleted_at = CURRENT_TIMESTAMP WHERE id = ?",
        [id]
      );
    } finally {
      await db.close();
    }
  },

  // Cancel reservation by code
  async cancelByCode(code) {
    const db = await getDbConnection();
    try {
      return await db.run(
        "UPDATE reservations SET deleted_at = CURRENT_TIMESTAMP WHERE code = ? AND deleted_at IS NULL",
        [code]
      );
    } finally {
      await db.close();
    }
  },

  async getReservationAnalytics(month) {

    const db = await getDbConnection();
    try {
      statistics = await db.all(`SELECT reservation_date,
                                        COUNT(*)                                                     as total_reservations,
                                        COUNT(CASE WHEN deleted_at IS NOT NULL THEN 1 END)           as deleted_reservations,
                                        COUNT(CASE WHEN deleted_at IS NULL THEN 1 END)               as active_reservations,
                                        SUM(CASE WHEN deleted_at IS NULL THEN party_size ELSE 0 END) as total_guests_active
                                 FROM reservations
                                 WHERE strftime('%m', reservation_date) =  '${month}'
                                 GROUP BY reservation_date
                                 ORDER BY reservation_date;`);
      return statistics;
    }catch {
      console.log("something went wrong with the statistics");
    } finally {
      await db.close();
    }
  }
};

// Menu Item models
const MenuItem = {
  // Get all menu items
  async getAll() {
    const db = await getDbConnection();
    try {
      return await db.all("SELECT * FROM menu_items");
    } finally {
      await db.close();
    }
  },
  
  // Get menu item by ID
  async getById(id) {
    const db = await getDbConnection();
    try {
      return await db.get("SELECT * FROM menu_items WHERE id = ?", [id]);
    } finally {
      await db.close();
    }
  },
  
  // Create a new menu item
  async create(itemData) {
    const { name, ingredients, price, available } = itemData;
    const db = await getDbConnection();
    try {
      return await db.run(
        "INSERT INTO menu_items (name, ingredients, price, available) VALUES (?, ?, ?, ?)",
        [name, ingredients, price, available ? 1 : 0]
      );
    } finally {
      await db.close();
    }
  },
  
  // Update menu item
  async update(id, itemData) {
    const { name, ingredients, price, available } = itemData;
    const db = await getDbConnection();
    try {
      return await db.run(
        "UPDATE menu_items SET name = ?, ingredients = ?, price = ?, available = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?",
        [name, ingredients, price, available ? 1 : 0, id]
      );
    } finally {
      await db.close();
    }
  },
  
  // Delete menu item
  async delete(id) {
    const db = await getDbConnection();
    try {
      return await db.run("DELETE FROM menu_items WHERE id = ?", [id]);
    } finally {
      await db.close();
    }
  }
};

// Employee models
const Employee = {
  // Get all employees
  async getAll() {
    const db = await getDbConnection();
    try {
      return await db.all("SELECT * FROM employees");
    } finally {
      await db.close();
    }
  },
  
  // Get employee by ID
  async getById(id) {
    const db = await getDbConnection();
    try {
      return await db.get("SELECT * FROM employees WHERE id = ?", [id]);
    } finally {
      await db.close();
    }
  },
  //Get employee by name
  async getByName(name) {
    const db = await getDbConnection();
    try {
      const result =  await db.get("SELECT name,code FROM employees WHERE name = ?  LIMIT 0,1", [name]);
      console.log(result);
      return result;
    } finally {
      await db.close();
    }
  },
  
  // Create a new employee
  async create(employeeData) {
    const { name, code, role } = employeeData;
    const db = await getDbConnection();
    try {
      return await db.run(
        "INSERT INTO employees (name, code, role) VALUES (?, ?, ?)",
        [name, code, role]
      );
    } finally {
      await db.close();
    }
  },
  
  // Update employee
  async update(id, employeeData) {
    const { name, code, role } = employeeData;
    const db = await getDbConnection();
    try {
      return await db.run(
        "UPDATE employees SET name = ?, code = ?, role = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?",
        [name, code, role, id]
      );
    } finally {
      await db.close();
    }
  },
  
  // Delete employee
  async delete(id) {
    const db = await getDbConnection();
    try {
      return await db.run("DELETE FROM employees WHERE id = ?", [id]);
    } finally {
      await db.close();
    }
  }
};

// Session models
const Session = {
  // Get all sessions
  async getAll() {
    const db = await getDbConnection();
    try {
      return await db.all("SELECT * FROM sessions");
    } finally {
      await db.close();
    }
  },
  
  // Get session by ID
  async getById(id) {
    const db = await getDbConnection();
    try {
      return await db.get("SELECT * FROM sessions WHERE id = ?", [id]);
    } finally {
      await db.close();
    }
  },
  
  // Create a new session
  async create(sessionData) {
    const { employee_id, start_datetime, device } = sessionData;
    const db = await getDbConnection();
    try {
      return await db.run(
        "INSERT INTO sessions (employee_id, start_datetime, device) VALUES (?, ?, ?)",
        [employee_id, start_datetime, device]
      );
    } finally {
      await db.close();
    }
  },
  
  // End session
  async end(id, endTime) {
    const db = await getDbConnection();
    try {
      return await db.run(
        "UPDATE sessions SET end_datetime = ? WHERE id = ?",
        [endTime, id]
      );
    } finally {
      await db.close();
    }
  }
};

module.exports = {
  Table,
  Customer,
  Reservation,
  Employee,
  MenuItem,
  Session
};
