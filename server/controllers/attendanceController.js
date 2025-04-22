const AttendanceModel = require("../models/attendanceModel");

class AttendanceController {
  // Lấy thông tin chấm công của giáo viên
  static getTeacherAttendance(req, res) {
    const teacherId = req.params.teacherId;

    AttendanceModel.getTeacherAttendance(teacherId, (err, attendance) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      return res.status(200).json({ data: attendance });
    });
  }

  // Chấm công cho giáo viên
  static markAttendance(req, res) {
    const attendanceData = req.body;

    // Validate input
    if (
      !attendanceData.assignment_id ||
      !attendanceData.teacher_id ||
      !attendanceData.date
    ) {
      return res.status(400).json({ message: "Thiếu thông tin cần thiết" });
    }

    AttendanceModel.markAttendance(attendanceData, (err, attendance) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      return res.status(201).json({
        message: "Chấm công thành công",
        data: attendance,
      });
    });
  }

  // Tính lương cho giáo viên
  static calculatePayroll(req, res) {
    const { teacherId, startDate, endDate } = req.body;

    // Validate input
    if (!teacherId || !startDate || !endDate) {
      return res.status(400).json({ message: "Thiếu thông tin cần thiết" });
    }

    AttendanceModel.calculatePayroll(
      teacherId,
      startDate,
      endDate,
      (err, payroll) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        if (!payroll) {
          return res
            .status(404)
            .json({
              message: "Không có dữ liệu chấm công cho khoảng thời gian này",
            });
        }
        return res.status(200).json({
          message: "Tính lương thành công",
          data: payroll,
        });
      }
    );
  }

  // Lấy lịch sử thanh toán lương của giáo viên
  static getTeacherPayroll(req, res) {
    const teacherId = req.params.teacherId;

    AttendanceModel.getTeacherPayroll(teacherId, (err, payroll) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      return res.status(200).json({ data: payroll });
    });
  }
}

module.exports = AttendanceController;
