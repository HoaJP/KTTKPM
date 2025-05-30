// const sqlite3 = require("sqlite3").verbose();
// const path = require("path");

// const dbPath = path.resolve(__dirname, "../database/language_center.db");
// const db = new sqlite3.Database(dbPath, (err) => {
//   if (err) {
//     console.error("Không thể kết nối đến SQLite database", err);
//   } else {
//     console.log("Đã kết nối đến SQLite database");
//     initDb();
//   }
// });

// function initDb() {
//   db.serialize(() => {
//     db.run(`CREATE TABLE IF NOT EXISTS teachers (
//       id INTEGER PRIMARY KEY AUTOINCREMENT,
//       fullName TEXT NOT NULL,
//       email TEXT UNIQUE,
//       phone TEXT,
//       specialization TEXT,
//       hourlyRate REAL,
//       status TEXT DEFAULT 'active',
//       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//     )`);

//     db.run(`CREATE TABLE IF NOT EXISTS classes (
//       id INTEGER PRIMARY KEY AUTOINCREMENT,
//       class_name TEXT NOT NULL,
//       subject TEXT NOT NULL,
//       start_date TEXT,
//       end_date TEXT,
//       start_time TEXT,
//       end_time TEXT,
//       UNIQUE(class_name, subject)
//     )`);

//     db.run(`CREATE TABLE IF NOT EXISTS teaching_assignments (
//       id INTEGER PRIMARY KEY AUTOINCREMENT,
//       teacher_id INTEGER,
//       class_id INTEGER,
//       FOREIGN KEY (teacher_id) REFERENCES teachers (id),
//       FOREIGN KEY (class_id) REFERENCES classes (id)
//     )`);

//     db.run(`INSERT OR IGNORE INTO classes (class_name, subject, start_date, end_date, start_time, end_time) VALUES
//       ('A1', 'Tiếng Anh', '2025-06-02', '2025-06-25', '08:00', '10:00'),
//       ('A2', 'Tiếng Anh', '2025-06-03', '2025-06-26', '10:30', '12:30'),
//       ('B1', 'Tiếng Anh', '2025-06-02', '2025-06-25', '14:00', '16:00'),
//       ('N5', 'Tiếng Nhật', '2025-06-03', '2025-06-26', '08:00', '10:00'),
//       ('N4', 'Tiếng Nhật', '2025-06-02', '2025-06-25', '10:30', '12:30'),
//       ('N3', 'Tiếng Nhật', '2025-06-03', '2025-06-26', '14:00', '16:00'),
//       ('HSK1', 'Tiếng Trung', '2025-06-02', '2025-06-25', '16:30', '18:30'),
//       ('HSK2', 'Tiếng Trung', '2025-06-03', '2025-06-26', '16:30', '18:30'),
//       ('HSK3', 'Tiếng Trung', '2025-06-02', '2025-06-25', '19:00', '21:00')
//     `);

//     console.log("Đã khởi tạo cấu trúc database");
//   });
// }

// module.exports = db;
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
    // Tạo bảng teachers
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

    // Tạo bảng classes
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

    // Tạo bảng teaching_assignments
    db.run(`CREATE TABLE IF NOT EXISTS teaching_assignments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      teacher_id INTEGER,
      class_id INTEGER,
      FOREIGN KEY (teacher_id) REFERENCES teachers (id),
      FOREIGN KEY (class_id) REFERENCES classes (id)
    )`);

    // Tạo bảng class_schedules
    db.run(`CREATE TABLE IF NOT EXISTS class_schedules (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      class_id INTEGER,
      day_of_week TEXT,
      date TEXT,
      start_time TEXT,
      end_time TEXT,
      FOREIGN KEY (class_id) REFERENCES classes (id)
    )`);

    // Chèn dữ liệu mẫu cho classes
    db.run(`INSERT OR IGNORE INTO classes (class_name, subject, start_date, end_date, start_time, end_time) VALUES
      ('A1', 'Tiếng Anh', '2025-06-02', '2025-07-25', '08:00', '10:00'),
      ('A2', 'Tiếng Anh', '2025-06-03', '2025-07-25', '10:30', '12:30'),
      ('B1', 'Tiếng Anh', '2025-06-02', '2025-07-25', '14:00', '16:00'),
      ('N5', 'Tiếng Nhật', '2025-06-03', '2025-07-25', '08:00', '10:00'),
      ('N4', 'Tiếng Nhật', '2025-06-02', '2025-07-25', '10:30', '12:30'),
      ('N3', 'Tiếng Nhật', '2025-06-03', '2025-07-25', '14:00', '16:00'),
      ('HSK1', 'Tiếng Trung', '2025-06-02', '2025-07-25', '16:30', '18:30'),
      ('HSK2', 'Tiếng Trung', '2025-06-03', '2025-07-25', '16:30', '18:30'),
      ('HSK3', 'Tiếng Trung', '2025-06-02', '2025-07-25', '19:00', '21:00')
    `);

    // Hàm tạo lịch dạy tự động
    const generateSchedule = () => {
      const classes = [
        {
          id: 1,
          class_name: "A1",
          start_date: "2025-06-02",
          start_time: "08:00",
          end_time: "10:00",
          days: ["Thứ Hai", "Thứ Tư"],
        },
        {
          id: 2,
          class_name: "A2",
          start_date: "2025-06-03",
          start_time: "10:30",
          end_time: "12:30",
          days: ["Thứ Ba", "Thứ Năm"],
        },
        {
          id: 3,
          class_name: "B1",
          start_date: "2025-06-02",
          start_time: "14:00",
          end_time: "16:00",
          days: ["Thứ Hai", "Thứ Tư"],
        },
        {
          id: 4,
          class_name: "N5",
          start_date: "2025-06-03",
          start_time: "08:00",
          end_time: "10:00",
          days: ["Thứ Ba", "Thứ Năm"],
        },
        {
          id: 5,
          class_name: "N4",
          start_date: "2025-06-02",
          start_time: "10:30",
          end_time: "12:30",
          days: ["Thứ Hai", "Thứ Tư"],
        },
        {
          id: 6,
          class_name: "N3",
          start_date: "2025-06-03",
          start_time: "14:00",
          end_time: "16:00",
          days: ["Thứ Ba", "Thứ Năm"],
        },
        {
          id: 7,
          class_name: "HSK1",
          start_date: "2025-06-02",
          start_time: "16:30",
          end_time: "18:30",
          days: ["Thứ Hai", "Thứ Tư"],
        },
        {
          id: 8,
          class_name: "HSK2",
          start_date: "2025-06-03",
          start_time: "16:30",
          end_time: "18:30",
          days: ["Thứ Ba", "Thứ Năm"],
        },
        {
          id: 9,
          class_name: "HSK3",
          start_date: "2025-06-02",
          start_time: "19:00",
          end_time: "21:00",
          days: ["Thứ Hai", "Thứ Tư"],
        },
      ];

      const usedSlots = new Set();

      classes.forEach((cls) => {
        let currentDate = new Date(cls.start_date);
        for (let week = 0; week < 8; week++) {
          cls.days.forEach((day) => {
            const dateStr = currentDate.toISOString().split("T")[0];
            const slot = `${dateStr}-${cls.start_time}-${cls.end_time}`;
            if (!usedSlots.has(slot)) {
              usedSlots.add(slot);
              db.run(
                `INSERT OR IGNORE INTO class_schedules (class_id, day_of_week, date, start_time, end_time) VALUES (?, ?, ?, ?, ?)`,
                [cls.id, day, dateStr, cls.start_time, cls.end_time]
              );
            }
            currentDate.setDate(
              currentDate.getDate() + (day === cls.days[0] ? 2 : 5)
            );
          });
        }
      });
    };

    // Gọi hàm tạo lịch dạy
    generateSchedule();

    console.log("Đã khởi tạo cấu trúc database và lịch dạy");
  });
}

module.exports = db;