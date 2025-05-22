BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "CUSTOMER" (
	"name"	TEXT,
	"phone_number"	TEXT,
	PRIMARY KEY("name")
);
CREATE TABLE IF NOT EXISTS "MENU_ITEM" (
	"name"	TEXT,
	"price"	NUMERIC NOT NULL,
	"availability"	INTEGER NOT NULL,
	"description"	TEXT NOT NULL,
	PRIMARY KEY("name")
);
CREATE TABLE IF NOT EXISTS "RESERVATION" (
	"date_time"	TEXT NOT NULL,
	"number_of_people"	INTEGER NOT NULL,
	"id"	INTEGER,
	"table"	INTEGER NOT NULL,
	"customer"	TEXT NOT NULL,
	"date_of_deletion"	INTEGER,
	"created_at"	TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY("id" AUTOINCREMENT),
	FOREIGN KEY("customer") REFERENCES "CUSTOMER"("name"),
	FOREIGN KEY("table") REFERENCES "TABLE"("id")
);
CREATE TABLE IF NOT EXISTS "TABLE" (
	"id"	INTEGER,
	"capacity"	INTEGER NOT NULL,
	"placement"	TEXT,
	PRIMARY KEY("id")
);
CREATE TABLE IF NOT EXISTS "USER" (
	"id"	INTEGER,
	"username"	TEXT NOT NULL,
	"password"	TEXT NOT NULL,
	"role"	TEXT NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT)
);
COMMIT;
