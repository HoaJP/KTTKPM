const express = require("express");
const router = express.Router();
const AvailabilityController = require("../controllers/availabilityController");

router.get(
  "/assignments/teacher/:teacherId",
  AvailabilityController.getTeacherAssignments
);
router.get("/subjects", AvailabilityController.getSubjects);
router.get("/classes/:subject", AvailabilityController.getClassesBySubject);
router.get(
  "/registered/:subject",
  AvailabilityController.getRegisteredClassesBySubject
);
router.get("/class/:id", AvailabilityController.getClassDetailsById);
router.post("/assignments", AvailabilityController.createAssignment);
router.get("/assignments", AvailabilityController.getAllAssignments);

module.exports = router;
