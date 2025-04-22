const express = require("express");
const router = express.Router();
const AvailabilityController = require("../controllers/availabilityController");

// Routes cho lịch rảnh
router.get(
  "/teacher/:teacherId",
  AvailabilityController.getTeacherAvailability
);
router.post("/", AvailabilityController.addAvailability);
router.delete("/:id", AvailabilityController.deleteAvailability);

// Routes cho lịch dạy (assignments)
router.get(
  "/assignments/teacher/:teacherId",
  AvailabilityController.getTeacherAssignments
);
router.post("/assignments", AvailabilityController.createAssignment);

module.exports = router;
