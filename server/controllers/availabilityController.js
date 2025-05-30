// const AvailabilityModel = require("../models/availabilityModel");

// class AvailabilityController {
//   static getTeacherAssignments(req, res) {
//     const teacherId = req.params.teacherId;

//     AvailabilityModel.getTeacherAssignments(teacherId, (err, assignments) => {
//       if (err) {
//         return res.status(500).json({ error: err.message });
//       }
//       return res.status(200).json({ data: assignments });
//     });
//   }

//   static getSubjects(req, res) {
//     AvailabilityModel.getSubjects((err, subjects) => {
//       if (err) {
//         return res.status(500).json({ error: err.message });
//       }
//       return res.status(200).json({ data: subjects });
//     });
//   }

//   static getClassesBySubject(req, res) {
//     const subject = req.params.subject;

//     AvailabilityModel.getClassesBySubject(subject, (err, classes) => {
//       if (err) {
//         return res.status(500).json({ error: err.message });
//       }
//       return res.status(200).json({ data: classes });
//     });
//   }

//   static getRegisteredClassesBySubject(req, res) {
//     const subject = req.params.subject;

//     AvailabilityModel.getRegisteredClassesBySubject(subject, (err, classes) => {
//       if (err) {
//         return res.status(500).json({ error: err.message });
//       }
//       return res.status(200).json({ data: classes });
//     });
//   }

//   static getClassDetailsById(req, res) {
//     const id = req.params.id;

//     AvailabilityModel.getClassById(id, (err, classData) => {
//       if (err) {
//         return res.status(500).json({ error: err.message });
//       }
//       if (!classData) {
//         return res.status(404).json({ error: "Không tìm thấy lớp học" });
//       }
//       return res.status(200).json({ data: classData });
//     });
//   }

//   static createAssignment(req, res) {
//     const assignmentData = req.body;

//     if (!assignmentData.teacher_id || !assignmentData.class_id) {
//       return res.status(400).json({ message: "Thiếu thông tin cần thiết" });
//     }

//     AvailabilityModel.createAssignment(assignmentData, (err, assignment) => {
//       if (err) {
//         return res.status(400).json({ error: err.message });
//       }
//       return res.status(201).json({
//         message: "Đăng ký lịch dạy thành công",
//         data: assignment,
//       });
//     });
//   }

//   static getAllAssignments(req, res) {
//     AvailabilityModel.getAllAssignments((err, assignments) => {
//       if (err) {
//         return res.status(500).json({ error: err.message });
//       }
//       return res.status(200).json({ data: assignments });
//     });
//   }

//   static deleteAssignment(req, res) {
//     const { teacherId, classId } = req.params;

//     AvailabilityModel.deleteAssignment(teacherId, classId, (err, result) => {
//       if (err) {
//         return res.status(400).json({ error: err.message });
//       }
//       return res.status(200).json({
//         message: "Hủy đăng ký lớp học thành công",
//         data: result,
//       });
//     });
//   }
// }

// module.exports = AvailabilityController;

const AvailabilityModel = require("../models/availabilityModel");

class AvailabilityController {
  static getTeacherAssignments(req, res) {
    const teacherId = req.params.teacherId;

    AvailabilityModel.getTeacherAssignments(teacherId, (err, assignments) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      return res.status(200).json({ data: assignments });
    });
  }

  static getSubjects(req, res) {
    AvailabilityModel.getSubjects((err, subjects) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      return res.status(200).json({ data: subjects });
    });
  }

  static getClassesBySubject(req, res) {
    const subject = req.params.subject;

    AvailabilityModel.getClassesBySubject(subject, (err, classes) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      return res.status(200).json({ data: classes });
    });
  }

  static getRegisteredClassesBySubject(req, res) {
    const subject = req.params.subject;

    AvailabilityModel.getRegisteredClassesBySubject(subject, (err, classes) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      return res.status(200).json({ data: classes });
    });
  }

  static getClassDetailsById(req, res) {
    const id = req.params.id;

    AvailabilityModel.getClassById(id, (err, classData) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (!classData) {
        return res.status(404).json({ error: "Không tìm thấy lớp học" });
      }
      return res.status(200).json({ data: classData });
    });
  }

  static createAssignment(req, res) {
    const assignmentData = req.body;

    if (!assignmentData.teacher_id || !assignmentData.class_id) {
      return res.status(400).json({ message: "Thiếu thông tin cần thiết" });
    }

    AvailabilityModel.createAssignment(assignmentData, (err, assignment) => {
      if (err) {
        return res.status(400).json({ error: err.message });
      }
      return res.status(201).json({
        message: "Đăng ký lịch dạy thành công",
        data: assignment,
      });
    });
  }

  static getAllAssignments(req, res) {
    AvailabilityModel.getAllAssignments((err, assignments) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      return res.status(200).json({ data: assignments });
    });
  }

  static deleteAssignment(req, res) {
    const { teacherId, classId } = req.params;

    AvailabilityModel.deleteAssignment(teacherId, classId, (err, result) => {
      if (err) {
        return res.status(400).json({ error: err.message });
      }
      return res.status(200).json({
        message: "Hủy đăng ký lớp học thành công",
        data: result,
      });
    });
  }
}

module.exports = AvailabilityController;