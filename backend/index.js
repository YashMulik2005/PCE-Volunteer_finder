const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const userRoutes = require("./routes/UserRoutes");
const organizationRoutes = require("./routes/OrganizationRoutes");
const eventRoutes = require("./routes/EventRoutes");
const applicationRoutes = require("./routes/ApplicationRoutes");

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/organizations", organizationRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/applications", applicationRoutes);

mongoose.set("strictQuery", false);
var db = process.env.db_url;
console.log(db);

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connect");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
