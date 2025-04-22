const db = require("../config/database");

class AttendanceModel {
  // Lấy thông tin chấm công của một giáo viên
  static getTeacherAttendance(teacherId, callback) {
    const sql = `
      SELECT a.*, ta.class_name, ta.subject, ta.date as class_date, 
             ta.start_time, ta.end_time 
      FROM attendance a
      JOIN teaching_assignments ta ON a.assignment_id = ta.id
      WHERE a.teacher_id = ?
    `;
    db.all(sql, [teacherId], (err, rows) => {
      if (err) {
        return callback(err, null);
      }
      return callback(null, rows);
    });
  }

  // Thêm thông tin chấm công
  static markAttendance(attendanceData, callback) {
    const { assignment_id, teacher_id, date, status, notes } = attendanceData;
    const sql = `INSERT INTO attendance 
                (assignment_id, teacher_id, date, status, notes) 
                VALUES (?, ?, ?, ?, ?)`;

    db.run(
      sql,
      [assignment_id, teacher_id, date, status, notes],
      function (err) {
        if (err) {
          return callback(err, null);
        }
        return callback(null, { id: this.lastID, ...attendanceData });
      }
    );
  }

  // Tính toán lương cho giáo viên trong một khoảng thời gian
  static calculatePayroll(teacherId, startDate, endDate, callback) {
    const sql = `
      SELECT t.id as teacher_id, t.fullName, t.hourlyRate, 
             SUM((strftime('%s', ta.end_time) - strftime('%s', ta.start_time)) / 3600.0) as total_hours,
             t.hourlyRate * SUM((strftime('%s', ta.end_time) - strftime('%s', ta.start_time)) / 3600.0) as total_amount
      FROM attendance a
      JOIN teaching_assignments ta ON a.assignment_id = ta.id
      JOIN teachers t ON a.teacher_id = t.id
      WHERE a.teacher_id = ? AND a.status = 'present' 
      AND date(a.date) BETWEEN date(?) AND date(?)
      GROUP BY t.id
    `;

    db.get(sql, [teacherId, startDate, endDate], (err, row) => {
      if (err) {
        return callback(err, null);
      }

      if (row) {
        // Thêm bảng lương mới
        const payrollSql = `INSERT INTO payroll 
                          (teacher_id, period_start, period_end, total_hours, amount) 
                          VALUES (?, ?, ?, ?, ?)`;

        db.run(
          payrollSql,
          [teacherId, startDate, endDate, row.total_hours, row.total_amount],
          function (err) {
            if (err) {
              return callback(err, null);
            }
            return callback(null, {
              id: this.lastID,
              teacher_id: teacherId,
              fullName: row.fullName,
              period_start: startDate,
              period_end: endDate,
              total_hours: row.total_hours,
              amount: row.total_amount,
            });
          }
        );
      } else {
        return callback(null, null);
      }
    });
  }

  // Lấy lịch sử thanh toán lương của giáo viên
  static getTeacherPayroll(teacherId, callback) {
    const sql = `
      SELECT p.*, t.fullName
      FROM payroll p
      JOIN teachers t ON p.teacher_id = t.id
      WHERE p.teacher_id = ?
      ORDER BY p.created_at DESC
    `;

    db.all(sql, [teacherId], (err, rows) => {
      if (err) {
        return callback(err, null);
      }
      return callback(null, rows);
    });
  }
}

module.exports = AttendanceModel;
