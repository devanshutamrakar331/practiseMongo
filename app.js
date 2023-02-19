const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const studentRouter = require("./routes/student");
const teacherRouter = require("./routes/teacher");

//middlewares
app.use(express.json());

//user made middlewares
app.use(studentRouter);
app.use(teacherRouter);

// mongoose coonection
mongoose.set("strictQuery", false);
mongoose
  .connect("mongodb://localhost/practiseMongo")
  .then((db) => {
    console.log("DB CONNECTED ");
  })
  .catch((err) => console.log(err));

//server connection
const port = process.env.PORT;

app.listen(port, () => {
  console.log("Server running at port:", port);
});
