const AvailabilityModel = require("../models/availabilityModel");

class AvailabilityController {
  // Lấy lịch rảnh của giáo viên
  static getTeacherAvailability(req, res) {
    const teacherId = req.params.teacherId;

    AvailabilityModel.getTeacherAvailability(teacherId, (err, availability) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      return res.status(200).json({ data: availability });
    });
  }

  // Thêm lịch rảnh cho giáo viên
  static addAvailability(req, res) {
    const availabilityData = req.body;

    // Validate input
    if (
      !availabilityData.teacher_id ||
      !availabilityData.day_of_week ||
      !availabilityData.start_time ||
      !availabilityData.end_time
    ) {
      return res.status(400).json({ message: "Thiếu thông tin cần thiết" });
    }

    AvailabilityModel.addAvailability(availabilityData, (err, availability) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      return res.status(201).json({
        message: "Thêm lịch rảnh thành công",
        data: availability,
      });
    });
  }

  // Xóa lịch rảnh
  static deleteAvailability(req, res) {
    const id = req.params.id;

    AvailabilityModel.deleteAvailability(id, (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      return res.status(200).json({
        message: "Xóa lịch rảnh thành công",
        data: result,
      });
    });
  }

  // Lấy lịch dạy của giáo viên
  static getTeacherAssignments(req, res) {
    const teacherId = req.params.teacherId;

    AvailabilityModel.getTeacherAssignments(teacherId, (err, assignments) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      return res.status(200).json({ data: assignments });
    });
  }

  // Thêm lịch dạy cho giáo viên
  static createAssignment(req, res) {
    const assignmentData = req.body;

    // Validate input
    if (
      !assignmentData.teacher_id ||
      !assignmentData.class_name ||
      !assignmentData.date ||
      !assignmentData.start_time ||
      !assignmentData.end_time
    ) {
      return res.status(400).json({ message: "Thiếu thông tin cần thiết" });
    }

    AvailabilityModel.createAssignment(assignmentData, (err, assignment) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      return res.status(201).json({
        message: "Thêm lịch dạy thành công",
        data: assignment,
      });
    });
  }
}

module.exports = AvailabilityController;
