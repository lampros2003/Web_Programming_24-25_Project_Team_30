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

    // Add demo data
    await db.run(`BEGIN TRANSACTION;
    INSERT INTO "customers" ("id","name","phone","created_at","updated_at") VALUES (2,'john johnson','6987654321','2025-05-27 10:06:13','2025-05-27 10:06:13');
    INSERT INTO "customers" ("id","name","phone","created_at","updated_at") VALUES (3,'Mila Cruz','202-555-1000','2025-05-27 10:19:31','2025-05-27 10:19:31');
    INSERT INTO "customers" ("id","name","phone","created_at","updated_at") VALUES (4,'Natalie Edwards','202-555-1001','2025-05-27 10:19:31','2025-05-27 10:19:31');
    INSERT INTO "customers" ("id","name","phone","created_at","updated_at") VALUES (5,'Layla Scott','202-555-1002','2025-05-27 10:19:31','2025-05-27 10:19:31');
    INSERT INTO "customers" ("id","name","phone","created_at","updated_at") VALUES (6,'Michael Harris','202-555-1003','2025-05-27 10:19:31','2025-05-27 10:19:31');
    INSERT INTO "customers" ("id","name","phone","created_at","updated_at") VALUES (7,'Harper Morris','202-555-1004','2025-05-27 10:19:31','2025-05-27 10:19:31');
    INSERT INTO "customers" ("id","name","phone","created_at","updated_at") VALUES (8,'Amelia Morris','202-555-1005','2025-05-27 10:19:31','2025-05-27 10:19:31');
    INSERT INTO "customers" ("id","name","phone","created_at","updated_at") VALUES (9,'Evelyn Morris','202-555-1006','2025-05-27 10:19:31','2025-05-27 10:19:31');
    INSERT INTO "customers" ("id","name","phone","created_at","updated_at") VALUES (10,'William Garcia','202-555-1007','2025-05-27 10:19:31','2025-05-27 10:19:31');
    INSERT INTO "customers" ("id","name","phone","created_at","updated_at") VALUES (11,'Evelyn Moore','202-555-1008','2025-05-27 10:19:31','2025-05-27 10:19:31');
    INSERT INTO "customers" ("id","name","phone","created_at","updated_at") VALUES (12,'Hannah King','202-555-1009','2025-05-27 10:19:31','2025-05-27 10:19:31');
    INSERT INTO "customers" ("id","name","phone","created_at","updated_at") VALUES (13,'Paisley Reyes','202-555-1010','2025-05-27 10:19:31','2025-05-27 10:19:31');
    INSERT INTO "customers" ("id","name","phone","created_at","updated_at") VALUES (14,'Mila Sanchez','202-555-1011','2025-05-27 10:19:31','2025-05-27 10:19:31');
    INSERT INTO "customers" ("id","name","phone","created_at","updated_at") VALUES (15,'Charlotte Lewis','202-555-1012','2025-05-27 10:19:31','2025-05-27 10:19:31');
    INSERT INTO "customers" ("id","name","phone","created_at","updated_at") VALUES (16,'Aiden Edwards','202-555-1013','2025-05-27 10:19:31','2025-05-27 10:19:31');
    INSERT INTO "customers" ("id","name","phone","created_at","updated_at") VALUES (17,'Jack Rogers','202-555-1014','2025-05-27 10:19:31','2025-05-27 10:19:31');
    INSERT INTO "customers" ("id","name","phone","created_at","updated_at") VALUES (18,'Daniel Gutierrez','202-555-1015','2025-05-27 10:19:31','2025-05-27 10:19:31');
    INSERT INTO "customers" ("id","name","phone","created_at","updated_at") VALUES (19,'Brooklyn Green','202-555-1016','2025-05-27 10:19:31','2025-05-27 10:19:31');
    INSERT INTO "customers" ("id","name","phone","created_at","updated_at") VALUES (20,'Lucy Thompson','202-555-1017','2025-05-27 10:19:31','2025-05-27 10:19:31');
    INSERT INTO "customers" ("id","name","phone","created_at","updated_at") VALUES (21,'Eleanor Phillips','202-555-1018','2025-05-27 10:19:31','2025-05-27 10:19:31');
    INSERT INTO "customers" ("id","name","phone","created_at","updated_at") VALUES (22,'Aaliyah Rogers','202-555-1019','2025-05-27 10:19:31','2025-05-27 10:19:31');
    INSERT INTO "customers" ("id","name","phone","created_at","updated_at") VALUES (23,'Addison Reyes','202-555-1020','2025-05-27 10:19:31','2025-05-27 10:19:31');
    INSERT INTO "customers" ("id","name","phone","created_at","updated_at") VALUES (24,'Scarlett Green','202-555-1021','2025-05-27 10:19:31','2025-05-27 10:19:31');
    INSERT INTO "customers" ("id","name","phone","created_at","updated_at") VALUES (25,'Aurora Jones','202-555-1022','2025-05-27 10:19:31','2025-05-27 10:19:31');
    INSERT INTO "customers" ("id","name","phone","created_at","updated_at") VALUES (26,'Jackson Gomez','202-555-1023','2025-05-27 10:19:31','2025-05-27 10:19:31');
    INSERT INTO "customers" ("id","name","phone","created_at","updated_at") VALUES (27,'Levi Hill','202-555-1024','2025-05-27 10:19:31','2025-05-27 10:19:31');
    INSERT INTO "customers" ("id","name","phone","created_at","updated_at") VALUES (28,'Grace Roberts','202-555-1025','2025-05-27 10:19:31','2025-05-27 10:19:31');
    INSERT INTO "customers" ("id","name","phone","created_at","updated_at") VALUES (29,'Natalie Miller','202-555-1026','2025-05-27 10:19:31','2025-05-27 10:19:31');
    INSERT INTO "customers" ("id","name","phone","created_at","updated_at") VALUES (30,'Savannah Cooper','202-555-1027','2025-05-27 10:19:31','2025-05-27 10:19:31');
    INSERT INTO "customers" ("id","name","phone","created_at","updated_at") VALUES (31,'Violet Davis','202-555-1028','2025-05-27 10:19:31','2025-05-27 10:19:31');
    INSERT INTO "customers" ("id","name","phone","created_at","updated_at") VALUES (32,'Zoey Gutierrez','202-555-1029','2025-05-27 10:19:31','2025-05-27 10:19:31');
    INSERT INTO "customers" ("id","name","phone","created_at","updated_at") VALUES (33,'Mason Scott','202-555-1030','2025-05-27 10:19:31','2025-05-27 10:19:31');
    INSERT INTO "customers" ("id","name","phone","created_at","updated_at") VALUES (34,'Aurora Roberts','202-555-1031','2025-05-27 10:19:31','2025-05-27 10:19:31');
    INSERT INTO "customers" ("id","name","phone","created_at","updated_at") VALUES (35,'Leah Wilson','202-555-1032','2025-05-27 10:19:31','2025-05-27 10:19:31');
    INSERT INTO "customers" ("id","name","phone","created_at","updated_at") VALUES (36,'Mila Roberts','202-555-1033','2025-05-27 10:19:31','2025-05-27 10:19:31');
    INSERT INTO "customers" ("id","name","phone","created_at","updated_at") VALUES (37,'Stella Williams','202-555-1034','2025-05-27 10:19:31','2025-05-27 10:19:31');
    INSERT INTO "customers" ("id","name","phone","created_at","updated_at") VALUES (38,'Grace Moore','202-555-1035','2025-05-27 10:19:31','2025-05-27 10:19:31');
    INSERT INTO "customers" ("id","name","phone","created_at","updated_at") VALUES (39,'Lucy Gutierrez','202-555-1036','2025-05-27 10:19:31','2025-05-27 10:19:31');
    INSERT INTO "customers" ("id","name","phone","created_at","updated_at") VALUES (40,'Levi Lee','202-555-1037','2025-05-27 10:19:31','2025-05-27 10:19:31');
    INSERT INTO "customers" ("id","name","phone","created_at","updated_at") VALUES (41,'Isabella Campbell','202-555-1038','2025-05-27 10:19:31','2025-05-27 10:19:31');
    INSERT INTO "customers" ("id","name","phone","created_at","updated_at") VALUES (42,'Daniel Garcia','202-555-1039','2025-05-27 10:19:31','2025-05-27 10:19:31');
    INSERT INTO "customers" ("id","name","phone","created_at","updated_at") VALUES (43,'Liam Perez','202-555-1040','2025-05-27 10:19:31','2025-05-27 10:19:31');
    INSERT INTO "customers" ("id","name","phone","created_at","updated_at") VALUES (44,'Jack Anderson','202-555-1041','2025-05-27 10:19:31','2025-05-27 10:19:31');
    INSERT INTO "customers" ("id","name","phone","created_at","updated_at") VALUES (45,'Ellie Morgan','202-555-1042','2025-05-27 10:19:31','2025-05-27 10:19:31');
    INSERT INTO "customers" ("id","name","phone","created_at","updated_at") VALUES (46,'Zoe Walker','202-555-1043','2025-05-27 10:19:31','2025-05-27 10:19:31');
    INSERT INTO "customers" ("id","name","phone","created_at","updated_at") VALUES (47,'Scarlett Lee','202-555-1044','2025-05-27 10:19:31','2025-05-27 10:19:31');
    INSERT INTO "customers" ("id","name","phone","created_at","updated_at") VALUES (48,'Addison Rogers','202-555-1045','2025-05-27 10:19:31','2025-05-27 10:19:31');
    INSERT INTO "customers" ("id","name","phone","created_at","updated_at") VALUES (49,'Grace Rivera','202-555-1046','2025-05-27 10:19:31','2025-05-27 10:19:31');
    INSERT INTO "customers" ("id","name","phone","created_at","updated_at") VALUES (50,'Levi Robinson','202-555-1047','2025-05-27 10:19:31','2025-05-27 10:19:31');
    INSERT INTO "customers" ("id","name","phone","created_at","updated_at") VALUES (51,'Sophia Wright','202-555-1048','2025-05-27 10:19:31','2025-05-27 10:19:31');
    INSERT INTO "customers" ("id","name","phone","created_at","updated_at") VALUES (52,'Levi Phillips','202-555-1049','2025-05-27 10:19:31','2025-05-27 10:19:31');
    INSERT INTO "customers" ("id","name","phone","created_at","updated_at") VALUES (53,'Lily Adams','202-555-1050','2025-05-27 10:19:31','2025-05-27 10:19:31');
    INSERT INTO "customers" ("id","name","phone","created_at","updated_at") VALUES (54,'Michael Taylor','202-555-1051','2025-05-27 10:19:31','2025-05-27 10:19:31');
    INSERT INTO "customers" ("id","name","phone","created_at","updated_at") VALUES (55,'Ava Ramirez','202-555-1052','2025-05-27 10:19:31','2025-05-27 10:19:31');
    INSERT INTO "customers" ("id","name","phone","created_at","updated_at") VALUES (56,'Sebastian Ortiz','202-555-1053','2025-05-27 10:19:31','2025-05-27 10:19:31');
    INSERT INTO "customers" ("id","name","phone","created_at","updated_at") VALUES (57,'William Cooper','202-555-1054','2025-05-27 10:19:31','2025-05-27 10:19:31');
    INSERT INTO "customers" ("id","name","phone","created_at","updated_at") VALUES (58,'Scarlett Johnson','202-555-1055','2025-05-27 10:19:31','2025-05-27 10:19:31');
    INSERT INTO "customers" ("id","name","phone","created_at","updated_at") VALUES (59,'Victoria Lee','202-555-1056','2025-05-27 10:19:31','2025-05-27 10:19:31');
    INSERT INTO "customers" ("id","name","phone","created_at","updated_at") VALUES (60,'Grace Reyes','202-555-1057','2025-05-27 10:19:31','2025-05-27 10:19:31');
    INSERT INTO "customers" ("id","name","phone","created_at","updated_at") VALUES (61,'Evelyn Scott','202-555-1058','2025-05-27 10:19:31','2025-05-27 10:19:31');
    INSERT INTO "customers" ("id","name","phone","created_at","updated_at") VALUES (62,'Alexander Rodriguez','202-555-1059','2025-05-27 10:19:31','2025-05-27 10:19:31');
    INSERT INTO "customers" ("id","name","phone","created_at","updated_at") VALUES (63,'Mia Nelson','202-555-1060','2025-05-27 10:19:31','2025-05-27 10:19:31');
    INSERT INTO "customers" ("id","name","phone","created_at","updated_at") VALUES (64,'Henry Parker','202-555-1061','2025-05-27 10:19:31','2025-05-27 10:19:31');
    INSERT INTO "customers" ("id","name","phone","created_at","updated_at") VALUES (65,'Olivia Carter','202-555-1062','2025-05-27 10:19:31','2025-05-27 10:19:31');
    INSERT INTO "customers" ("id","name","phone","created_at","updated_at") VALUES (66,'Oliver Williams','202-555-1063','2025-05-27 10:19:31','2025-05-27 10:19:31');
    INSERT INTO "customers" ("id","name","phone","created_at","updated_at") VALUES (67,'Violet Mitchell','202-555-1064','2025-05-27 10:19:31','2025-05-27 10:19:31');
    INSERT INTO "customers" ("id","name","phone","created_at","updated_at") VALUES (68,'Levi Edwards','202-555-1065','2025-05-27 10:19:31','2025-05-27 10:19:31');
    INSERT INTO "customers" ("id","name","phone","created_at","updated_at") VALUES (69,'Ellie Brown','202-555-1066','2025-05-27 10:19:31','2025-05-27 10:19:31');
    INSERT INTO "customers" ("id","name","phone","created_at","updated_at") VALUES (70,'Hazel Edwards','202-555-1067','2025-05-27 10:19:31','2025-05-27 10:19:31');
    INSERT INTO "customers" ("id","name","phone","created_at","updated_at") VALUES (71,'Chloe Allen','202-555-1068','2025-05-27 10:19:31','2025-05-27 10:19:31');
    INSERT INTO "customers" ("id","name","phone","created_at","updated_at") VALUES (72,'Sophia Diaz','202-555-1069','2025-05-27 10:19:31','2025-05-27 10:19:31');
    INSERT INTO "customers" ("id","name","phone","created_at","updated_at") VALUES (73,'Violet Cook','202-555-1070','2025-05-27 10:19:31','2025-05-27 10:19:31');
    INSERT INTO "customers" ("id","name","phone","created_at","updated_at") VALUES (74,'Lily Lopez','202-555-1071','2025-05-27 10:19:31','2025-05-27 10:19:31');
    INSERT INTO "customers" ("id","name","phone","created_at","updated_at") VALUES (75,'Jackson Nguyen','202-555-1072','2025-05-27 10:19:31','2025-05-27 10:19:31');
    INSERT INTO "customers" ("id","name","phone","created_at","updated_at") VALUES (76,'Aaliyah Phillips','202-555-1073','2025-05-27 10:19:31','2025-05-27 10:19:31');
    INSERT INTO "customers" ("id","name","phone","created_at","updated_at") VALUES (77,'Aaliyah Brown','202-555-1074','2025-05-27 10:19:31','2025-05-27 10:19:31');
    INSERT INTO "customers" ("id","name","phone","created_at","updated_at") VALUES (78,'Alexander Collins','202-555-1075','2025-05-27 10:19:31','2025-05-27 10:19:31');
    INSERT INTO "customers" ("id","name","phone","created_at","updated_at") VALUES (79,'Ellie Nelson','202-555-1076','2025-05-27 10:19:31','2025-05-27 10:19:31');
    INSERT INTO "customers" ("id","name","phone","created_at","updated_at") VALUES (80,'Henry Morris','202-555-1077','2025-05-27 10:19:31','2025-05-27 10:19:31');
    INSERT INTO "customers" ("id","name","phone","created_at","updated_at") VALUES (81,'Skylar Wilson','202-555-1078','2025-05-27 10:19:31','2025-05-27 10:19:31');
    INSERT INTO "customers" ("id","name","phone","created_at","updated_at") VALUES (82,'Eleanor Morris','202-555-1079','2025-05-27 10:19:31','2025-05-27 10:19:31');
    INSERT INTO "employees" ("id","name","code","role","created_at","updated_at") VALUES (221,'Admin User','admin123','administrator','2025-05-28 11:02:39','2025-05-28 11:02:39');
    INSERT INTO "employees" ("id","name","code","role","created_at","updated_at") VALUES (222,'Waiter One','waiter123','waiter','2025-05-28 11:02:39','2025-05-28 11:02:39');
    INSERT INTO "menu_items" ("id","name","ingredients","price","available","category","image","dietary_restrictions","created_at","updated_at") VALUES (1211,'Creamy Wild Mushroom Soup','Wild mushrooms, cream, truffle oil, fresh herbs, garlic',12.99,1,'starter','/images/menu/mushroom-soup.jpg','vegetarian,gluten-free','2025-05-28 11:02:39','2025-05-28 11:02:39');
    INSERT INTO "menu_items" ("id","name","ingredients","price","available","category","image","dietary_restrictions","created_at","updated_at") VALUES (1212,'Mediterranean Bruschetta','Artisan bread, tomatoes, basil, balsamic glaze, olive oil',9.99,1,'starter','/images/menu/bruschetta.jpg','vegan','2025-05-28 11:02:39','2025-05-28 11:02:39');
    INSERT INTO "menu_items" ("id","name","ingredients","price","available","category","image","dietary_restrictions","created_at","updated_at") VALUES (1213,'Caesar Salad','Romaine lettuce, parmesan cheese, croutons, caesar dressing',11.5,1,'starter','/images/menu/caesar-salad.jpg','vegetarian','2025-05-28 11:02:39','2025-05-28 11:02:39');
    INSERT INTO "menu_items" ("id","name","ingredients","price","available","category","image","dietary_restrictions","created_at","updated_at") VALUES (1214,'Grilled Atlantic Salmon','Fresh salmon fillet, lemon-dill sauce, seasonal vegetables',26.99,1,'main','/images/menu/salmon.jpg','gluten-free','2025-05-28 11:02:39','2025-05-28 11:02:39');
    INSERT INTO "menu_items" ("id","name","ingredients","price","available","category","image","dietary_restrictions","created_at","updated_at") VALUES (1215,'Truffle Risotto','Arborio rice, wild mushrooms, white truffle oil, aged Parmesan',22.5,1,'main','/images/menu/risotto.jpg','vegetarian','2025-05-28 11:02:39','2025-05-28 11:02:39');
    INSERT INTO "menu_items" ("id","name","ingredients","price","available","category","image","dietary_restrictions","created_at","updated_at") VALUES (1216,'Grass-Fed Ribeye Steak','12oz prime ribeye, red wine reduction, roasted garlic butter',34.99,1,'main','/images/menu/steak.jpg','','2025-05-28 11:02:39','2025-05-28 11:02:39');
    INSERT INTO "menu_items" ("id","name","ingredients","price","available","category","image","dietary_restrictions","created_at","updated_at") VALUES (1217,'Vegan Buddha Bowl','Quinoa, roasted vegetables, avocado, chickpeas, tahini dressing',18.99,1,'main','/images/menu/buddha-bowl.jpg','vegan,gluten-free,nut-free','2025-05-28 11:02:39','2025-05-28 11:02:39');
    INSERT INTO "menu_items" ("id","name","ingredients","price","available","category","image","dietary_restrictions","created_at","updated_at") VALUES (1218,'Margherita Pizza','San Marzano tomatoes, fresh mozzarella, basil, olive oil',16.99,1,'main','/images/menu/pizza.jpg','vegetarian','2025-05-28 11:02:39','2025-05-28 11:02:39');
    INSERT INTO "menu_items" ("id","name","ingredients","price","available","category","image","dietary_restrictions","created_at","updated_at") VALUES (1219,'Dark Chocolate Soufflé','Belgian dark chocolate, vanilla bean ice cream, berry coulis',14.99,1,'dessert','/images/menu/chocolate-souffle.jpg','vegetarian','2025-05-28 11:02:39','2025-05-28 11:02:39');
    INSERT INTO "menu_items" ("id","name","ingredients","price","available","category","image","dietary_restrictions","created_at","updated_at") VALUES (1220,'Lemon Tart','Tangy lemon curd, buttery pastry shell, fresh berries, mint',10.99,1,'dessert','/images/menu/lemon-tart.jpg','vegetarian,nut-free','2025-05-28 11:02:39','2025-05-28 11:02:39');
    INSERT INTO "menu_items" ("id","name","ingredients","price","available","category","image","dietary_restrictions","created_at","updated_at") VALUES (1221,'Tiramisu','Ladyfingers, mascarpone, espresso, cocoa powder',12.5,1,'dessert','/images/menu/tiramisu.jpg','vegetarian','2025-05-28 11:02:39','2025-05-28 11:02:39');
    INSERT INTO "reservations" ("id","table_id","customer_id","reservation_date","reservation_time","party_size","code","deleted_at","created_at","updated_at") VALUES (3,1,2,'2025-05-05','20:00:00',4,'3506RM',NULL,'2025-05-01 09:00:00','2025-05-01 09:00:00');
    INSERT INTO "reservations" ("id","table_id","customer_id","reservation_date","reservation_time","party_size","code","deleted_at","created_at","updated_at") VALUES (4,2,2,'2025-05-20','18:00:00',4,'I983ZN',NULL,'2025-05-01 12:00:00','2025-05-01 12:00:00');
    INSERT INTO "reservations" ("id","table_id","customer_id","reservation_date","reservation_time","party_size","code","deleted_at","created_at","updated_at") VALUES (5,3,3,'2025-05-20','13:00:00',3,'CL5YN8',NULL,'2025-05-01 15:00:00','2025-05-01 15:00:00');
    INSERT INTO "reservations" ("id","table_id","customer_id","reservation_date","reservation_time","party_size","code","deleted_at","created_at","updated_at") VALUES (6,4,4,'2025-05-13','17:00:00',3,'CIEXVV',NULL,'2025-05-01 18:00:00','2025-05-01 18:00:00');
    INSERT INTO "reservations" ("id","table_id","customer_id","reservation_date","reservation_time","party_size","code","deleted_at","created_at","updated_at") VALUES (7,5,5,'2025-05-29','15:00:00',4,'VRJBOT',NULL,'2025-05-02 09:00:00','2025-05-02 09:00:00');
    INSERT INTO "reservations" ("id","table_id","customer_id","reservation_date","reservation_time","party_size","code","deleted_at","created_at","updated_at") VALUES (8,6,6,'2025-05-06','15:00:00',2,'JA37GK',NULL,'2025-05-02 12:00:00','2025-05-02 12:00:00');
    INSERT INTO "reservations" ("id","table_id","customer_id","reservation_date","reservation_time","party_size","code","deleted_at","created_at","updated_at") VALUES (9,7,7,'2025-05-20','16:00:00',2,'WZ19T5',NULL,'2025-05-02 15:00:00','2025-05-02 15:00:00');
    INSERT INTO "reservations" ("id","table_id","customer_id","reservation_date","reservation_time","party_size","code","deleted_at","created_at","updated_at") VALUES (10,8,8,'2025-05-28','12:00:00',2,'HRX7HU',NULL,'2025-05-02 18:00:00','2025-05-02 18:00:00');
    INSERT INTO "reservations" ("id","table_id","customer_id","reservation_date","reservation_time","party_size","code","deleted_at","created_at","updated_at") VALUES (11,9,9,'2025-05-17','20:00:00',2,'0KQ0JK',NULL,'2025-05-03 09:00:00','2025-05-03 09:00:00');
    INSERT INTO "reservations" ("id","table_id","customer_id","reservation_date","reservation_time","party_size","code","deleted_at","created_at","updated_at") VALUES (12,10,10,'2025-05-21','17:00:00',2,'KE2WUM',NULL,'2025-05-03 12:00:00','2025-05-03 12:00:00');
    INSERT INTO "reservations" ("id","table_id","customer_id","reservation_date","reservation_time","party_size","code","deleted_at","created_at","updated_at") VALUES (13,11,11,'2025-05-07','18:00:00',3,'R3ZOQR',NULL,'2025-05-03 15:00:00','2025-05-03 15:00:00');
    INSERT INTO "reservations" ("id","table_id","customer_id","reservation_date","reservation_time","party_size","code","deleted_at","created_at","updated_at") VALUES (14,12,12,'2025-05-11','17:00:00',3,'TA4NIV',NULL,'2025-05-03 18:00:00','2025-05-03 18:00:00');
    INSERT INTO "reservations" ("id","table_id","customer_id","reservation_date","reservation_time","party_size","code","deleted_at","created_at","updated_at") VALUES (15,13,13,'2025-06-02','15:00:00',3,'ZUXRSU',NULL,'2025-05-04 09:00:00','2025-05-04 09:00:00');
    INSERT INTO "reservations" ("id","table_id","customer_id","reservation_date","reservation_time","party_size","code","deleted_at","created_at","updated_at") VALUES (16,14,14,'2025-05-30','21:00:00',3,'XPVSZ9',NULL,'2025-05-04 12:00:00','2025-05-04 12:00:00');
    INSERT INTO "reservations" ("id","table_id","customer_id","reservation_date","reservation_time","party_size","code","deleted_at","created_at","updated_at") VALUES (17,15,15,'2025-05-08','21:00:00',4,'EYQZGA',NULL,'2025-05-04 15:00:00','2025-05-04 15:00:00');
    INSERT INTO "reservations" ("id","table_id","customer_id","reservation_date","reservation_time","party_size","code","deleted_at","created_at","updated_at") VALUES (18,16,16,'2025-05-30','15:00:00',2,'WITVV2',NULL,'2025-05-04 18:00:00','2025-05-04 18:00:00');
    INSERT INTO "reservations" ("id","table_id","customer_id","reservation_date","reservation_time","party_size","code","deleted_at","created_at","updated_at") VALUES (19,17,5,'2025-05-15','13:00:00',3,'6QPZF5',NULL,'2025-05-05 09:00:00','2025-05-05 09:00:00');
    INSERT INTO "reservations" ("id","table_id","customer_id","reservation_date","reservation_time","party_size","code","deleted_at","created_at","updated_at") VALUES (20,18,18,'2025-05-31','13:00:00',2,'68FIKM',NULL,'2025-05-05 12:00:00','2025-05-05 12:00:00');
    INSERT INTO "reservations" ("id","table_id","customer_id","reservation_date","reservation_time","party_size","code","deleted_at","created_at","updated_at") VALUES (21,19,19,'2025-05-07','15:00:00',3,'CIP85W',NULL,'2025-05-05 15:00:00','2025-05-05 15:00:00');
    INSERT INTO "reservations" ("id","table_id","customer_id","reservation_date","reservation_time","party_size","code","deleted_at","created_at","updated_at") VALUES (22,20,20,'2025-05-09','20:00:00',4,'N1PI3O',NULL,'2025-05-05 18:00:00','2025-05-05 18:00:00');
    INSERT INTO "reservations" ("id","table_id","customer_id","reservation_date","reservation_time","party_size","code","deleted_at","created_at","updated_at") VALUES (23,1,21,'2025-05-22','18:00:00',2,'Q6Y921',NULL,'2025-05-06 09:00:00','2025-05-06 09:00:00');
    INSERT INTO "reservations" ("id","table_id","customer_id","reservation_date","reservation_time","party_size","code","deleted_at","created_at","updated_at") VALUES (24,2,22,'2025-05-30','14:00:00',3,'6PJDLH',NULL,'2025-05-06 12:00:00','2025-05-06 12:00:00');
    INSERT INTO "reservations" ("id","table_id","customer_id","reservation_date","reservation_time","party_size","code","deleted_at","created_at","updated_at") VALUES (25,3,23,'2025-05-31','18:00:00',4,'GFRBLM',NULL,'2025-05-06 15:00:00','2025-05-06 15:00:00');
    INSERT INTO "reservations" ("id","table_id","customer_id","reservation_date","reservation_time","party_size","code","deleted_at","created_at","updated_at") VALUES (26,4,24,'2025-05-10','20:00:00',4,'3IPV4R',NULL,'2025-05-06 18:00:00','2025-05-06 18:00:00');
    INSERT INTO "reservations" ("id","table_id","customer_id","reservation_date","reservation_time","party_size","code","deleted_at","created_at","updated_at") VALUES (27,5,25,'2025-05-10','18:00:00',4,'T48H0U',NULL,'2025-05-07 09:00:00','2025-05-07 09:00:00');
    INSERT INTO "reservations" ("id","table_id","customer_id","reservation_date","reservation_time","party_size","code","deleted_at","created_at","updated_at") VALUES (28,6,26,'2025-05-12','18:00:00',3,'KFYNT0',NULL,'2025-05-07 12:00:00','2025-05-07 12:00:00');
    INSERT INTO "reservations" ("id","table_id","customer_id","reservation_date","reservation_time","party_size","code","deleted_at","created_at","updated_at") VALUES (29,7,27,'2025-05-14','18:00:00',2,'3K6597',NULL,'2025-05-07 15:00:00','2025-05-07 15:00:00');
    INSERT INTO "reservations" ("id","table_id","customer_id","reservation_date","reservation_time","party_size","code","deleted_at","created_at","updated_at") VALUES (30,8,28,'2025-05-25','18:00:00',2,'4RC32V',NULL,'2025-05-07 18:00:00','2025-05-07 18:00:00');
    INSERT INTO "reservations" ("id","table_id","customer_id","reservation_date","reservation_time","party_size","code","deleted_at","created_at","updated_at") VALUES (31,9,29,'2025-05-20','19:00:00',3,'Q68WDL',NULL,'2025-05-08 09:00:00','2025-05-08 09:00:00');
    INSERT INTO "reservations" ("id","table_id","customer_id","reservation_date","reservation_time","party_size","code","deleted_at","created_at","updated_at") VALUES (32,10,30,'2025-06-04','13:00:00',4,'0ZVK7R',NULL,'2025-05-08 12:00:00','2025-05-08 12:00:00');
    INSERT INTO "reservations" ("id","table_id","customer_id","reservation_date","reservation_time","party_size","code","deleted_at","created_at","updated_at") VALUES (33,11,31,'2025-06-03','16:00:00',4,'GSFBSZ',NULL,'2025-05-08 15:00:00','2025-05-08 15:00:00');
    INSERT INTO "reservations" ("id","table_id","customer_id","reservation_date","reservation_time","party_size","code","deleted_at","created_at","updated_at") VALUES (34,12,32,'2025-05-19','16:00:00',4,'DV540V',NULL,'2025-05-08 18:00:00','2025-05-08 18:00:00');
    INSERT INTO "reservations" ("id","table_id","customer_id","reservation_date","reservation_time","party_size","code","deleted_at","created_at","updated_at") VALUES (35,13,33,'2025-05-26','15:00:00',3,'GEQU9P',NULL,'2025-05-09 09:00:00','2025-05-09 09:00:00');
    INSERT INTO "reservations" ("id","table_id","customer_id","reservation_date","reservation_time","party_size","code","deleted_at","created_at","updated_at") VALUES (36,14,34,'2025-06-03','16:00:00',3,'4Z3A57',NULL,'2025-05-09 12:00:00','2025-05-09 12:00:00');
    INSERT INTO "reservations" ("id","table_id","customer_id","reservation_date","reservation_time","party_size","code","deleted_at","created_at","updated_at") VALUES (37,15,35,'2025-05-15','14:00:00',4,'QDPW7R',NULL,'2025-05-09 15:00:00','2025-05-09 15:00:00');
    INSERT INTO "reservations" ("id","table_id","customer_id","reservation_date","reservation_time","party_size","code","deleted_at","created_at","updated_at") VALUES (38,16,36,'2025-06-01','21:00:00',3,'J1S96T',NULL,'2025-05-09 18:00:00','2025-05-09 18:00:00');
    INSERT INTO "reservations" ("id","table_id","customer_id","reservation_date","reservation_time","party_size","code","deleted_at","created_at","updated_at") VALUES (39,17,37,'2025-06-05','21:00:00',3,'YHTBE9',NULL,'2025-05-10 09:00:00','2025-05-10 09:00:00');
    INSERT INTO "reservations" ("id","table_id","customer_id","reservation_date","reservation_time","party_size","code","deleted_at","created_at","updated_at") VALUES (40,18,38,'2025-05-12','18:00:00',4,'LCNLT4',NULL,'2025-05-10 12:00:00','2025-05-10 12:00:00');
    INSERT INTO "reservations" ("id","table_id","customer_id","reservation_date","reservation_time","party_size","code","deleted_at","created_at","updated_at") VALUES (41,19,39,'2025-05-23','15:00:00',2,'FIYU9G',NULL,'2025-05-10 15:00:00','2025-05-10 15:00:00');
    INSERT INTO "reservations" ("id","table_id","customer_id","reservation_date","reservation_time","party_size","code","deleted_at","created_at","updated_at") VALUES (42,20,40,'2025-05-14','18:00:00',3,'3QHAG6',NULL,'2025-05-10 18:00:00','2025-05-10 18:00:00');
    INSERT INTO "reservations" ("id","table_id","customer_id","reservation_date","reservation_time","party_size","code","deleted_at","created_at","updated_at") VALUES (43,1,41,'2025-06-08','16:00:00',4,'96HEJX',NULL,'2025-05-11 09:00:00','2025-05-11 09:00:00');
    INSERT INTO "reservations" ("id","table_id","customer_id","reservation_date","reservation_time","party_size","code","deleted_at","created_at","updated_at") VALUES (44,2,42,'2025-05-21','20:00:00',4,'5XP1IV',NULL,'2025-05-11 12:00:00','2025-05-11 12:00:00');
    INSERT INTO "reservations" ("id","table_id","customer_id","reservation_date","reservation_time","party_size","code","deleted_at","created_at","updated_at") VALUES (45,3,43,'2025-05-24','21:00:00',2,'K5MYAT',NULL,'2025-05-11 15:00:00','2025-05-11 15:00:00');
    INSERT INTO "reservations" ("id","table_id","customer_id","reservation_date","reservation_time","party_size","code","deleted_at","created_at","updated_at") VALUES (46,4,44,'2025-05-20','16:00:00',4,'X74AKX',NULL,'2025-05-11 18:00:00','2025-05-11 18:00:00');
    INSERT INTO "reservations" ("id","table_id","customer_id","reservation_date","reservation_time","party_size","code","deleted_at","created_at","updated_at") VALUES (47,5,45,'2025-05-31','20:00:00',2,'Q1KI4M',NULL,'2025-05-12 09:00:00','2025-05-12 09:00:00');
    INSERT INTO "reservations" ("id","table_id","customer_id","reservation_date","reservation_time","party_size","code","deleted_at","created_at","updated_at") VALUES (48,6,46,'2025-05-24','19:00:00',4,'WY2LDE',NULL,'2025-05-12 12:00:00','2025-05-12 12:00:00');
    INSERT INTO "reservations" ("id","table_id","customer_id","reservation_date","reservation_time","party_size","code","deleted_at","created_at","updated_at") VALUES (49,7,47,'2025-06-11','21:00:00',3,'HDNIV9',NULL,'2025-05-12 15:00:00','2025-05-12 15:00:00');
    INSERT INTO "reservations" ("id","table_id","customer_id","reservation_date","reservation_time","party_size","code","deleted_at","created_at","updated_at") VALUES (50,8,48,'2025-06-04','18:00:00',4,'E3COHD',NULL,'2025-05-12 18:00:00','2025-05-12 18:00:00');
    INSERT INTO "reservations" ("id","table_id","customer_id","reservation_date","reservation_time","party_size","code","deleted_at","created_at","updated_at") VALUES (51,9,49,'2025-05-30','12:00:00',2,'WR7BU2',NULL,'2025-05-13 09:00:00','2025-05-13 09:00:00');
    INSERT INTO "reservations" ("id","table_id","customer_id","reservation_date","reservation_time","party_size","code","deleted_at","created_at","updated_at") VALUES (52,10,50,'2025-06-03','16:00:00',3,'0NNDIY',NULL,'2025-05-13 12:00:00','2025-05-13 12:00:00');
    INSERT INTO "reservations" ("id","table_id","customer_id","reservation_date","reservation_time","party_size","code","deleted_at","created_at","updated_at") VALUES (53,11,51,'2025-05-16','15:00:00',4,'TMSJE5',NULL,'2025-05-13 15:00:00','2025-05-13 15:00:00');
    INSERT INTO "reservations" ("id","table_id","customer_id","reservation_date","reservation_time","party_size","code","deleted_at","created_at","updated_at") VALUES (54,12,52,'2025-05-15','17:00:00',2,'Y7VMN5',NULL,'2025-05-13 18:00:00','2025-05-13 18:00:00');
    INSERT INTO "reservations" ("id","table_id","customer_id","reservation_date","reservation_time","party_size","code","deleted_at","created_at","updated_at") VALUES (55,13,53,'2025-05-29','19:00:00',2,'YV8VPK',NULL,'2025-05-14 09:00:00','2025-05-14 09:00:00');
    INSERT INTO "reservations" ("id","table_id","customer_id","reservation_date","reservation_time","party_size","code","deleted_at","created_at","updated_at") VALUES (56,14,54,'2025-05-18','20:00:00',3,'PV4FO7',NULL,'2025-05-14 12:00:00','2025-05-14 12:00:00');
    INSERT INTO "reservations" ("id","table_id","customer_id","reservation_date","reservation_time","party_size","code","deleted_at","created_at","updated_at") VALUES (57,15,55,'2025-05-16','13:00:00',4,'AG91N1',NULL,'2025-05-14 15:00:00','2025-05-14 15:00:00');
    INSERT INTO "reservations" ("id","table_id","customer_id","reservation_date","reservation_time","party_size","code","deleted_at","created_at","updated_at") VALUES (58,16,56,'2025-05-22','18:00:00',4,'CBSZF4',NULL,'2025-05-14 18:00:00','2025-05-14 18:00:00');
    INSERT INTO "reservations" ("id","table_id","customer_id","reservation_date","reservation_time","party_size","code","deleted_at","created_at","updated_at") VALUES (59,17,57,'2025-06-02','21:00:00',3,'YJGT5S',NULL,'2025-05-15 09:00:00','2025-05-15 09:00:00');
    INSERT INTO "reservations" ("id","table_id","customer_id","reservation_date","reservation_time","party_size","code","deleted_at","created_at","updated_at") VALUES (60,18,58,'2025-05-24','17:00:00',2,'8KTSSA',NULL,'2025-05-15 12:00:00','2025-05-15 12:00:00');
    INSERT INTO "reservations" ("id","table_id","customer_id","reservation_date","reservation_time","party_size","code","deleted_at","created_at","updated_at") VALUES (61,19,59,'2025-05-26','18:00:00',4,'QG6NPG',NULL,'2025-05-15 15:00:00','2025-05-15 15:00:00');
    INSERT INTO "reservations" ("id","table_id","customer_id","reservation_date","reservation_time","party_size","code","deleted_at","created_at","updated_at") VALUES (62,20,60,'2025-05-30','21:00:00',4,'TFDHZV',NULL,'2025-05-15 18:00:00','2025-05-15 18:00:00');
    INSERT INTO "reservations" ("id","table_id","customer_id","reservation_date","reservation_time","party_size","code","deleted_at","created_at","updated_at") VALUES (63,1,61,'2025-05-29','17:00:00',2,'WCQOEE',NULL,'2025-05-16 09:00:00','2025-05-16 09:00:00');
    INSERT INTO "reservations" ("id","table_id","customer_id","reservation_date","reservation_time","party_size","code","deleted_at","created_at","updated_at") VALUES (64,2,62,'2025-06-03','13:00:00',2,'XT5UEW',NULL,'2025-05-16 12:00:00','2025-05-16 12:00:00');
    INSERT INTO "reservations" ("id","table_id","customer_id","reservation_date","reservation_time","party_size","code","deleted_at","created_at","updated_at") VALUES (65,3,63,'2025-05-26','20:00:00',3,'1T01LH',NULL,'2025-05-16 15:00:00','2025-05-16 15:00:00');
    INSERT INTO "reservations" ("id","table_id","customer_id","reservation_date","reservation_time","party_size","code","deleted_at","created_at","updated_at") VALUES (66,4,64,'2025-05-22','20:00:00',3,'EC1BF9',NULL,'2025-05-16 18:00:00','2025-05-16 18:00:00');
    INSERT INTO "reservations" ("id","table_id","customer_id","reservation_date","reservation_time","party_size","code","deleted_at","created_at","updated_at") VALUES (67,5,65,'2025-06-16','21:00:00',4,'Q26B68',NULL,'2025-05-17 09:00:00','2025-05-17 09:00:00');
    INSERT INTO "reservations" ("id","table_id","customer_id","reservation_date","reservation_time","party_size","code","deleted_at","created_at","updated_at") VALUES (68,6,66,'2025-05-26','18:00:00',4,'SMVF52',NULL,'2025-05-17 12:00:00','2025-05-17 12:00:00');
    INSERT INTO "reservations" ("id","table_id","customer_id","reservation_date","reservation_time","party_size","code","deleted_at","created_at","updated_at") VALUES (69,7,67,'2025-05-22','17:00:00',3,'XTCJ2K',NULL,'2025-05-17 15:00:00','2025-05-17 15:00:00');
    INSERT INTO "reservations" ("id","table_id","customer_id","reservation_date","reservation_time","party_size","code","deleted_at","created_at","updated_at") VALUES (70,8,68,'2025-05-29','15:00:00',4,'9ND52E',NULL,'2025-05-17 18:00:00','2025-05-17 18:00:00');
    INSERT INTO "reservations" ("id","table_id","customer_id","reservation_date","reservation_time","party_size","code","deleted_at","created_at","updated_at") VALUES (71,9,69,'2025-06-06','18:00:00',3,'UDSMRX',NULL,'2025-05-18 09:00:00','2025-05-18 09:00:00');
    INSERT INTO "reservations" ("id","table_id","customer_id","reservation_date","reservation_time","party_size","code","deleted_at","created_at","updated_at") VALUES (72,10,70,'2025-06-02','18:00:00',4,'7IARD7',NULL,'2025-05-18 12:00:00','2025-05-18 12:00:00');
    INSERT INTO "reservations" ("id","table_id","customer_id","reservation_date","reservation_time","party_size","code","deleted_at","created_at","updated_at") VALUES (73,11,71,'2025-05-22','15:00:00',2,'2GV2VT',NULL,'2025-05-18 15:00:00','2025-05-18 15:00:00');
    INSERT INTO "reservations" ("id","table_id","customer_id","reservation_date","reservation_time","party_size","code","deleted_at","created_at","updated_at") VALUES (74,12,72,'2025-05-19','14:00:00',4,'C6P967',NULL,'2025-05-18 18:00:00','2025-05-18 18:00:00');
    INSERT INTO "reservations" ("id","table_id","customer_id","reservation_date","reservation_time","party_size","code","deleted_at","created_at","updated_at") VALUES (75,13,73,'2025-06-17','12:00:00',3,'AW4U3E',NULL,'2025-05-19 09:00:00','2025-05-19 09:00:00');
    INSERT INTO "reservations" ("id","table_id","customer_id","reservation_date","reservation_time","party_size","code","deleted_at","created_at","updated_at") VALUES (76,14,74,'2025-06-10','18:00:00',4,'4NIJUL',NULL,'2025-05-19 12:00:00','2025-05-19 12:00:00');
    INSERT INTO "reservations" ("id","table_id","customer_id","reservation_date","reservation_time","party_size","code","deleted_at","created_at","updated_at") VALUES (77,15,75,'2025-06-16','12:00:00',4,'BK620Y',NULL,'2025-05-19 15:00:00','2025-05-19 15:00:00');
    INSERT INTO "reservations" ("id","table_id","customer_id","reservation_date","reservation_time","party_size","code","deleted_at","created_at","updated_at") VALUES (78,16,76,'2025-06-11','16:00:00',2,'HR667U',NULL,'2025-05-19 18:00:00','2025-05-19 18:00:00');
    INSERT INTO "reservations" ("id","table_id","customer_id","reservation_date","reservation_time","party_size","code","deleted_at","created_at","updated_at") VALUES (79,17,77,'2025-06-16','15:00:00',3,'CW2TK1',NULL,'2025-05-20 09:00:00','2025-05-20 09:00:00');
    INSERT INTO "reservations" ("id","table_id","customer_id","reservation_date","reservation_time","party_size","code","deleted_at","created_at","updated_at") VALUES (80,18,78,'2025-05-30','15:00:00',4,'2X58OM',NULL,'2025-05-20 12:00:00','2025-05-20 12:00:00');
    INSERT INTO "reservations" ("id","table_id","customer_id","reservation_date","reservation_time","party_size","code","deleted_at","created_at","updated_at") VALUES (81,19,79,'2025-06-04','16:00:00',3,'GV512U',NULL,'2025-05-20 15:00:00','2025-05-20 15:00:00');
    INSERT INTO "reservations" ("id","table_id","customer_id","reservation_date","reservation_time","party_size","code","deleted_at","created_at","updated_at") VALUES (82,20,80,'2025-06-02','19:00:00',3,'TIETWB',NULL,'2025-05-20 18:00:00','2025-05-20 18:00:00');
    INSERT INTO "reservations" ("id","table_id","customer_id","reservation_date","reservation_time","party_size","code","deleted_at","created_at","updated_at") VALUES (83,1,81,'2025-05-25','19:00:00',3,'RQJHOI',NULL,'2025-05-21 09:00:00','2025-05-21 09:00:00');
    INSERT INTO "reservations" ("id","table_id","customer_id","reservation_date","reservation_time","party_size","code","deleted_at","created_at","updated_at") VALUES (84,2,4,'2025-06-15','18:00:00',2,'J9APCF',NULL,'2025-05-21 12:00:00','2025-05-21 12:00:00');
    INSERT INTO "reservations" ("id","table_id","customer_id","reservation_date","reservation_time","party_size","code","deleted_at","created_at","updated_at") VALUES (85,3,5,'2025-06-11','19:00:00',3,'OQXUN3',NULL,'2025-05-21 15:00:00','2025-05-21 15:00:00');
    INSERT INTO "reservations" ("id","table_id","customer_id","reservation_date","reservation_time","party_size","code","deleted_at","created_at","updated_at") VALUES (86,4,6,'2025-06-20','12:00:00',2,'FECYGQ',NULL,'2025-05-21 18:00:00','2025-05-21 18:00:00');
    INSERT INTO "reservations" ("id","table_id","customer_id","reservation_date","reservation_time","party_size","code","deleted_at","created_at","updated_at") VALUES (87,5,7,'2025-06-01','21:00:00',3,'8S1UYJ',NULL,'2025-05-22 09:00:00','2025-05-22 09:00:00');
    INSERT INTO "reservations" ("id","table_id","customer_id","reservation_date","reservation_time","party_size","code","deleted_at","created_at","updated_at") VALUES (88,6,8,'2025-06-20','15:00:00',2,'329L8B',NULL,'2025-05-22 12:00:00','2025-05-22 12:00:00');
    INSERT INTO "reservations" ("id","table_id","customer_id","reservation_date","reservation_time","party_size","code","deleted_at","created_at","updated_at") VALUES (89,7,9,'2025-06-15','20:00:00',3,'8LLPHF',NULL,'2025-05-22 15:00:00','2025-05-22 15:00:00');
    INSERT INTO "reservations" ("id","table_id","customer_id","reservation_date","reservation_time","party_size","code","deleted_at","created_at","updated_at") VALUES (90,8,10,'2025-06-13','16:00:00',2,'WDVS0M',NULL,'2025-05-22 18:00:00','2025-05-22 18:00:00');
    INSERT INTO "reservations" ("id","table_id","customer_id","reservation_date","reservation_time","party_size","code","deleted_at","created_at","updated_at") VALUES (91,9,11,'2025-06-22','14:00:00',2,'68B782',NULL,'2025-05-23 09:00:00','2025-05-23 09:00:00');
    INSERT INTO "reservations" ("id","table_id","customer_id","reservation_date","reservation_time","party_size","code","deleted_at","created_at","updated_at") VALUES (92,10,12,'2025-05-31','18:00:00',3,'F4H89H',NULL,'2025-05-23 12:00:00','2025-05-23 12:00:00');
    INSERT INTO "reservations" ("id","table_id","customer_id","reservation_date","reservation_time","party_size","code","deleted_at","created_at","updated_at") VALUES (93,11,13,'2025-06-05','18:00:00',4,'Y87UUR',NULL,'2025-05-23 15:00:00','2025-05-23 15:00:00');
    INSERT INTO "reservations" ("id","table_id","customer_id","reservation_date","reservation_time","party_size","code","deleted_at","created_at","updated_at") VALUES (94,12,14,'2025-06-19','17:00:00',4,'WZRE3I',NULL,'2025-05-23 18:00:00','2025-05-23 18:00:00');
    INSERT INTO "reservations" ("id","table_id","customer_id","reservation_date","reservation_time","party_size","code","deleted_at","created_at","updated_at") VALUES (95,13,15,'2025-06-21','17:00:00',2,'03HMY8',NULL,'2025-05-24 09:00:00','2025-05-24 09:00:00');
    INSERT INTO "reservations" ("id","table_id","customer_id","reservation_date","reservation_time","party_size","code","deleted_at","created_at","updated_at") VALUES (96,14,16,'2025-06-18','19:00:00',4,'ZZUBFL',NULL,'2025-05-24 12:00:00','2025-05-24 12:00:00');
    INSERT INTO "reservations" ("id","table_id","customer_id","reservation_date","reservation_time","party_size","code","deleted_at","created_at","updated_at") VALUES (97,15,17,'2025-06-20','20:00:00',4,'9OHTLK',NULL,'2025-05-24 15:00:00','2025-05-24 15:00:00');
    INSERT INTO "reservations" ("id","table_id","customer_id","reservation_date","reservation_time","party_size","code","deleted_at","created_at","updated_at") VALUES (98,16,18,'2025-06-09','15:00:00',4,'Z0UYML',NULL,'2025-05-24 18:00:00','2025-05-24 18:00:00');
    INSERT INTO "reservations" ("id","table_id","customer_id","reservation_date","reservation_time","party_size","code","deleted_at","created_at","updated_at") VALUES (99,17,19,'2025-06-05','16:00:00',3,'ZUL5F6',NULL,'2025-05-25 09:00:00','2025-05-25 09:00:00');
    INSERT INTO "reservations" ("id","table_id","customer_id","reservation_date","reservation_time","party_size","code","deleted_at","created_at","updated_at") VALUES (100,18,20,'2025-06-18','16:00:00',2,'7DCCQC',NULL,'2025-05-25 12:00:00','2025-05-25 12:00:00');
    INSERT INTO "reservations" ("id","table_id","customer_id","reservation_date","reservation_time","party_size","code","deleted_at","created_at","updated_at") VALUES (101,19,21,'2025-06-19','13:00:00',4,'PCW0UG',NULL,'2025-05-25 15:00:00','2025-05-25 15:00:00');
    INSERT INTO "reservations" ("id","table_id","customer_id","reservation_date","reservation_time","party_size","code","deleted_at","created_at","updated_at") VALUES (102,20,22,'2025-05-29','20:00:00',2,'D2YKTT',NULL,'2025-05-25 18:00:00','2025-05-25 18:00:00');
    INSERT INTO "reservations" ("id","table_id","customer_id","reservation_date","reservation_time","party_size","code","deleted_at","created_at","updated_at") VALUES (103,1,23,'2025-06-21','16:00:00',2,'9MD55W',NULL,'2025-05-26 09:00:00','2025-05-26 09:00:00');
    INSERT INTO "reservations" ("id","table_id","customer_id","reservation_date","reservation_time","party_size","code","deleted_at","created_at","updated_at") VALUES (104,2,24,'2025-06-14','20:00:00',2,'VPHNUT',NULL,'2025-05-26 12:00:00','2025-05-26 12:00:00');
    INSERT INTO "reservations" ("id","table_id","customer_id","reservation_date","reservation_time","party_size","code","deleted_at","created_at","updated_at") VALUES (105,3,25,'2025-06-11','20:00:00',2,'U94040',NULL,'2025-05-26 15:00:00','2025-05-26 15:00:00');
    INSERT INTO "reservations" ("id","table_id","customer_id","reservation_date","reservation_time","party_size","code","deleted_at","created_at","updated_at") VALUES (106,4,26,'2025-06-22','15:00:00',4,'NTA1PT',NULL,'2025-05-26 18:00:00','2025-05-26 18:00:00');
    INSERT INTO "reservations" ("id","table_id","customer_id","reservation_date","reservation_time","party_size","code","deleted_at","created_at","updated_at") VALUES (107,5,27,'2025-06-26','19:00:00',2,'W23PFE',NULL,'2025-05-27 09:00:00','2025-05-27 09:00:00');
    INSERT INTO "reservations" ("id","table_id","customer_id","reservation_date","reservation_time","party_size","code","deleted_at","created_at","updated_at") VALUES (108,6,28,'2025-06-11','12:00:00',3,'5ZUFNF',NULL,'2025-05-27 12:00:00','2025-05-27 12:00:00');
    INSERT INTO "reservations" ("id","table_id","customer_id","reservation_date","reservation_time","party_size","code","deleted_at","created_at","updated_at") VALUES (109,7,29,'2025-06-20','13:00:00',4,'D3NGV3',NULL,'2025-05-27 15:00:00','2025-05-27 15:00:00');
    INSERT INTO "reservations" ("id","table_id","customer_id","reservation_date","reservation_time","party_size","code","deleted_at","created_at","updated_at") VALUES (110,8,30,'2025-06-07','17:00:00',2,'UBUEWJ',NULL,'2025-05-27 18:00:00','2025-05-27 18:00:00');
    INSERT INTO "tables" ("id","shape","table_number","capacity","location","created_at","updated_at") VALUES (193,'round',1,4,'window','2025-05-28 11:02:39','2025-05-28 11:02:39');
    INSERT INTO "tables" ("id","shape","table_number","capacity","location","created_at","updated_at") VALUES (194,'square',2,2,'corner','2025-05-28 11:02:39','2025-05-28 11:02:39');
    INSERT INTO "tables" ("id","shape","table_number","capacity","location","created_at","updated_at") VALUES (195,'rectangular',3,6,'center','2025-05-28 11:02:39','2025-05-28 11:02:39');
    COMMIT;`);

    console.log('Demo data inserted successfully');
    console.log('Menu items added: 12 items including appetizers, mains, and desserts');
  } finally {
    await db.close();
  }
}

// Run the initialization
initializeApp();
