const express = require("express");
const router = express.Router();
const AttendanceController = require("../controllers/attendanceController");

// Routes cho chấm công
router.get("/teacher/:teacherId", AttendanceController.getTeacherAttendance);
router.post("/", AttendanceController.markAttendance);

// Routes cho thanh toán lương
router.post("/payroll/calculate", AttendanceController.calculatePayroll);
router.get(
  "/payroll/teacher/:teacherId",
  AttendanceController.getTeacherPayroll
);

module.exports = router;
