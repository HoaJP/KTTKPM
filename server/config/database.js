const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// Tạo kết nối đến file database
const dbPath = path.resolve(__dirname, "../database/language_center.db");
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Không thể kết nối đến SQLite database", err);
  } else {
    console.log("Đã kết nối đến SQLite database");
    initDb();
  }
});

// Khởi tạo cấu trúc database
function initDb() {
  db.serialize(() => {
    // Bảng Giáo viên
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

    // Bảng lịch rảnh của giáo viên
    db.run(`CREATE TABLE IF NOT EXISTS teacher_availability (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      teacher_id INTEGER,
      day_of_week INTEGER, 
      start_time TEXT,
      end_time TEXT,
      FOREIGN KEY (teacher_id) REFERENCES teachers (id)
    )`);

    // Bảng phân công giảng dạy
    db.run(`CREATE TABLE IF NOT EXISTS teaching_assignments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      teacher_id INTEGER,
      class_name TEXT,
      subject TEXT,
      date TEXT,
      start_time TEXT,
      end_time TEXT,
      status TEXT DEFAULT 'scheduled',
      FOREIGN KEY (teacher_id) REFERENCES teachers (id)
    )`);

    // Bảng chấm công
    db.run(`CREATE TABLE IF NOT EXISTS attendance (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      assignment_id INTEGER,
      teacher_id INTEGER,
      date TEXT,
      status TEXT DEFAULT 'present',
      notes TEXT,
      FOREIGN KEY (assignment_id) REFERENCES teaching_assignments (id),
      FOREIGN KEY (teacher_id) REFERENCES teachers (id)
    )`);

    // Bảng thanh toán lương
    db.run(`CREATE TABLE IF NOT EXISTS payroll (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      teacher_id INTEGER,
      period_start TEXT,
      period_end TEXT,
      total_hours REAL,
      amount REAL,
      status TEXT DEFAULT 'pending',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (teacher_id) REFERENCES teachers (id)
    )`);

    console.log("Đã khởi tạo cấu trúc database");
  });
}

module.exports = db;
