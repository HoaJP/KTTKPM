const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const teacherRoutes = require("./routes/teacherRoutes");
const availabilityRoutes = require("./routes/availabilityRoutes");

app.use("/api/teachers", teacherRoutes);
app.use("/api/availability", availabilityRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Language Center Management API" });
});

app.listen(PORT, () => {
  console.log(`Server đang chạy trên port ${PORT}`);
});
