const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

// Khởi tạo Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Import routes
const teacherRoutes = require("./routes/teacherRoutes");
const availabilityRoutes = require("./routes/availabilityRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");

// Sử dụng routes
app.use("/api/teachers", teacherRoutes);
app.use("/api/availability", availabilityRoutes);
app.use("/api/attendance", attendanceRoutes);

// Route mặc định
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Language Center Management API" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server đang chạy trên port ${PORT}`);
});
