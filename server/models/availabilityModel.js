const db = require("../config/database");

class AvailabilityModel {
  static getTeacherAssignments(teacherId, callback) {
    const sql = `
      SELECT c.id as class_id, c.class_name, c.subject, c.start_date, c.end_date, c.start_time, c.end_time
      FROM teaching_assignments ta
      JOIN classes c ON ta.class_id = c.id
      WHERE ta.teacher_id = ?
    `;
    db.all(sql, [teacherId], (err, rows) => {
      if (err) {
        return callback(err, null);
      }
      return callback(null, rows);
    });
  }

  static getSubjects(callback) {
    const sql = "SELECT DISTINCT subject FROM classes";
    db.all(sql, [], (err, rows) => {
      if (err) {
        return callback(err, null);
      }
      return callback(
        null,
        rows.map((row) => row.subject)
      );
    });
  }

  static getClassesBySubject(subject, callback) {
    const sql = `
      SELECT id, class_name
      FROM classes
      WHERE subject = ?
    `;
    db.all(sql, [subject], (err, rows) => {
      if (err) {
        return callback(err, null);
      }
      return callback(null, rows);
    });
  }

  static getRegisteredClassesBySubject(subject, callback) {
    const sql = `
      SELECT DISTINCT c.id as class_id, c.class_name, c.subject, c.start_date, c.end_date, c.start_time, c.end_time,
             GROUP_CONCAT(t.fullName) as teachers
      FROM classes c
      LEFT JOIN teaching_assignments ta ON c.id = ta.class_id
      LEFT JOIN teachers t ON ta.teacher_id = t.id
      WHERE c.subject = ?
      GROUP BY c.id
      HAVING COUNT(ta.id) > 0
    `;
    db.all(sql, [subject], (err, rows) => {
      if (err) {
        return callback(err, null);
      }
      const classes = rows.map((row) => ({
        ...row,
        teachers: row.teachers ? row.teachers.split(",") : [],
      }));
      return callback(null, classes);
    });
  }

  static getClassById(id, callback) {
    const sql = `
      SELECT id, class_name, subject, start_date, end_date, start_time, end_time
      FROM classes
      WHERE id = ?
    `;
    db.get(sql, [id], (err, row) => {
      if (err) {
        return callback(err, null);
      }
      return callback(null, row);
    });
  }

  static createAssignment(assignmentData, callback) {
    const { teacher_id, class_id } = assignmentData;

    const checkSpecializationSql = `
      SELECT specialization FROM teachers WHERE id = ?
    `;
    db.get(checkSpecializationSql, [teacher_id], (err, teacher) => {
      if (err) {
        return callback(err, null);
      }
      if (!teacher) {
        return callback(new Error("Không tìm thấy giáo viên"), null);
      }

      const getClassSql = `
        SELECT subject, start_date, end_date, start_time, end_time
        FROM classes
        WHERE id = ?
      `;
      db.get(getClassSql, [class_id], (err, classData) => {
        if (err) {
          return callback(err, null);
        }
        if (!classData) {
          return callback(new Error("Không tìm thấy lớp học"), null);
        }

        if (teacher.specialization !== classData.subject) {
          return callback(
            new Error("Không đúng chuyên môn của giáo viên"),
            null
          );
        }

        const insertSql = `
          INSERT INTO teaching_assignments (teacher_id, class_id)
          VALUES (?, ?)
        `;
        db.run(insertSql, [teacher_id, class_id], function (err) {
          if (err) {
            return callback(err, null);
          }
          const getAssignmentSql = `
            SELECT c.id as class_id, c.class_name, c.subject, c.start_date, c.end_date, c.start_time, c.end_time
            FROM classes c
            WHERE c.id = ?
          `;
          db.get(getAssignmentSql, [class_id], (err, row) => {
            if (err) {
              return callback(err, null);
            }
            return callback(null, {
              id: this.lastID,
              teacher_id,
              class_id,
              class_name: row.class_name,
              subject: row.subject,
              start_date: row.start_date,
              end_date: row.end_date,
              start_time: row.start_time,
              end_time: row.end_time,
            });
          });
        });
      });
    });
  }

  static getAllAssignments(callback) {
    const sql = `
      SELECT c.id as class_id, c.class_name, c.subject, c.start_date, c.end_date, c.start_time, c.end_time,
             GROUP_CONCAT(t.fullName) as teachers
      FROM teaching_assignments ta
      JOIN classes c ON ta.class_id = c.id
      JOIN teachers t ON ta.teacher_id = t.id
      GROUP BY c.id
    `;
    db.all(sql, [], (err, rows) => {
      if (err) {
        return callback(err, null);
      }
      const assignments = rows.map((row) => ({
        ...row,
        teachers: row.teachers ? row.teachers.split(",") : [],
      }));
      return callback(null, assignments);
    });
  }
}

module.exports = AvailabilityModel;
