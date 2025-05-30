const TeacherModel = require("../models/teacherModel");

class TeacherController {
  static getAllTeachers(req, res) {
    TeacherModel.getAllTeachers((err, teachers) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      return res.status(200).json({ data: teachers });
    });
  }

  static getTeacherById(req, res) {
    const id = req.params.id;

    TeacherModel.getTeacherById(id, (err, teacher) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (!teacher) {
        return res.status(404).json({ message: "Không tìm thấy giáo viên" });
      }
      return res.status(200).json({ data: teacher });
    });
  }

  static createTeacher(req, res) {
    const teacherData = req.body;

    if (!teacherData.fullName) {
      return res.status(400).json({ message: "Tên giáo viên là bắt buộc" });
    }

    TeacherModel.createTeacher(teacherData, (err, teacher) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      return res.status(201).json({
        message: "Thêm giáo viên thành công",
        data: teacher,
      });
    });
  }

  static updateTeacher(req, res) {
    const id = req.params.id;
    const teacherData = req.body;

    if (!teacherData.fullName) {
      return res.status(400).json({ message: "Tên giáo viên là bắt buộc" });
    }

    TeacherModel.updateTeacher(id, teacherData, (err, teacher) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      return res.status(200).json({
        message: "Cập nhật giáo viên thành công",
        data: teacher,
      });
    });
  }

  static deleteTeacher(req, res) {
    const id = req.params.id;

    TeacherModel.deleteTeacher(id, (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      return res.status(200).json({
        message: "Xóa giáo viên thành công",
        data: result,
      });
    });
  }
}

module.exports = TeacherController;
