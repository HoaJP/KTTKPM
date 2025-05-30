const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const dbPath = path.resolve(__dirname, "../database/language_center.db");
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Không thể kết nối đến SQLite database", err);
  } else {
    console.log("Đã kết nối đến SQLite database");
    initDb();
  }
});

function initDb() {
  db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS teachers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      fullName TEXT NOT NULL,
      email TEXT UNIQUE,
      phone TEXT,
      specialization TEXT,
      hourlyRate REAL,
      status TEXT DEFAULT 'active',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS classes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      class_name TEXT NOT NULL,
      subject TEXT NOT NULL,
      start_date TEXT,
      end_date TEXT,
      start_time TEXT,
      end_time TEXT,
      UNIQUE(class_name, subject)
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS teaching_assignments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      teacher_id INTEGER,
      class_id INTEGER,
      FOREIGN KEY (teacher_id) REFERENCES teachers (id),
      FOREIGN KEY (class_id) REFERENCES classes (id)
    )`);

    db.run(`INSERT OR IGNORE INTO classes (class_name, subject, start_date, end_date, start_time, end_time) VALUES
      ('A1', 'Tiếng Anh', '2025-06-02', '2025-06-25', '08:00', '10:00'),
      ('A2', 'Tiếng Anh', '2025-06-03', '2025-06-26', '10:30', '12:30'),
      ('B1', 'Tiếng Anh', '2025-06-02', '2025-06-25', '14:00', '16:00'),
      ('N5', 'Tiếng Nhật', '2025-06-03', '2025-06-26', '08:00', '10:00'),
      ('N4', 'Tiếng Nhật', '2025-06-02', '2025-06-25', '10:30', '12:30'),
      ('N3', 'Tiếng Nhật', '2025-06-03', '2025-06-26', '14:00', '16:00'),
      ('HSK1', 'Tiếng Trung', '2025-06-02', '2025-06-25', '16:30', '18:30'),
      ('HSK2', 'Tiếng Trung', '2025-06-03', '2025-06-26', '16:30', '18:30'),
      ('HSK3', 'Tiếng Trung', '2025-06-02', '2025-06-25', '19:00', '21:00')
    `);

    console.log("Đã khởi tạo cấu trúc database");
  });
}

module.exports = db;
