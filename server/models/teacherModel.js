const db = require("../config/database");

class TeacherModel {
  static getAllTeachers(callback) {
    const sql = "SELECT * FROM teachers";
    db.all(sql, [], (err, rows) => {
      if (err) {
        return callback(err, null);
      }
      return callback(null, rows);
    });
  }

  static getTeacherById(id, callback) {
    const sql = "SELECT * FROM teachers WHERE id = ?";
    db.get(sql, [id], (err, row) => {
      if (err) {
        return callback(err, null);
      }
      return callback(null, row);
    });
  }

  static createTeacher(teacherData, callback) {
    const { fullName, email, phone, specialization, hourlyRate } = teacherData;
    const sql = `INSERT INTO teachers 
                (fullName, email, phone, specialization, hourlyRate) 
                VALUES (?, ?, ?, ?, ?)`;

    db.run(
      sql,
      [fullName, email, phone, specialization, hourlyRate],
      function (err) {
        if (err) {
          return callback(err, null);
        }
        return callback(null, { id: this.lastID, ...teacherData });
      }
    );
  }

  static updateTeacher(id, teacherData, callback) {
    const { fullName, email, phone, specialization, hourlyRate, status } =
      teacherData;
    const sql = `UPDATE teachers 
                SET fullName = ?, 
                    email = ?, 
                    phone = ?, 
                    specialization = ?, 
                    hourlyRate = ?,
                    status = ?
                WHERE id = ?`;

    db.run(
      sql,
      [fullName, email, phone, specialization, hourlyRate, status, id],
      (err) => {
        if (err) {
          return callback(err, null);
        }
        return callback(null, { id, ...teacherData });
      }
    );
  }

  static deleteTeacher(id, callback) {
    const sql = "DELETE FROM teachers WHERE id = ?";
    db.run(sql, [id], (err) => {
      if (err) {
        return callback(err, null);
      }
      return callback(null, { id });
    });
  }
}

module.exports = TeacherModel;
