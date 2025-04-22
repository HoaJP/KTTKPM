const db = require("../config/database");

class AvailabilityModel {
  // Lấy lịch rảnh của một giáo viên
  static getTeacherAvailability(teacherId, callback) {
    const sql = "SELECT * FROM teacher_availability WHERE teacher_id = ?";
    db.all(sql, [teacherId], (err, rows) => {
      if (err) {
        return callback(err, null);
      }
      return callback(null, rows);
    });
  }

  // Thêm lịch rảnh cho giáo viên
  static addAvailability(availabilityData, callback) {
    const { teacher_id, day_of_week, start_time, end_time } = availabilityData;
    const sql = `INSERT INTO teacher_availability 
                (teacher_id, day_of_week, start_time, end_time) 
                VALUES (?, ?, ?, ?)`;

    db.run(
      sql,
      [teacher_id, day_of_week, start_time, end_time],
      function (err) {
        if (err) {
          return callback(err, null);
        }
        return callback(null, { id: this.lastID, ...availabilityData });
      }
    );
  }

  // Xóa lịch rảnh
  static deleteAvailability(id, callback) {
    const sql = "DELETE FROM teacher_availability WHERE id = ?";
    db.run(sql, [id], (err) => {
      if (err) {
        return callback(err, null);
      }
      return callback(null, { id });
    });
  }

  // Lấy tất cả thông tin phân công giảng dạy của giáo viên
  static getTeacherAssignments(teacherId, callback) {
    const sql = "SELECT * FROM teaching_assignments WHERE teacher_id = ?";
    db.all(sql, [teacherId], (err, rows) => {
      if (err) {
        return callback(err, null);
      }
      return callback(null, rows);
    });
  }

  // Thêm phân công giảng dạy
  static createAssignment(assignmentData, callback) {
    const { teacher_id, class_name, subject, date, start_time, end_time } =
      assignmentData;
    const sql = `INSERT INTO teaching_assignments 
                (teacher_id, class_name, subject, date, start_time, end_time) 
                VALUES (?, ?, ?, ?, ?, ?)`;

    db.run(
      sql,
      [teacher_id, class_name, subject, date, start_time, end_time],
      function (err) {
        if (err) {
          return callback(err, null);
        }
        return callback(null, { id: this.lastID, ...assignmentData });
      }
    );
  }
}

module.exports = AvailabilityModel;
