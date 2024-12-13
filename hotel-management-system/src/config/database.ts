import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('hotelmanagement.db');

export const initDatabase = () => {
  db.transaction(tx => {
    // Create Guests table
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS guests (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT,
        phone TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );`
    );

    // Create Rooms table
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS rooms (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        number TEXT NOT NULL UNIQUE,
        type TEXT NOT NULL,
        price REAL NOT NULL,
        status TEXT CHECK(status IN ('available', 'occupied', 'maintenance')) DEFAULT 'available',
        description TEXT
      );`
    );

    // Create Reservations table
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS reservations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        guest_id INTEGER,
        room_id INTEGER,
        check_in_date DATE NOT NULL,
        check_out_date DATE NOT NULL,
        status TEXT CHECK(status IN ('confirmed', 'checked_in', 'checked_out', 'cancelled')) DEFAULT 'confirmed',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (guest_id) REFERENCES guests (id),
        FOREIGN KEY (room_id) REFERENCES rooms (id)
      );`
    );
  });
};

export default db;
