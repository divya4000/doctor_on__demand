const express = require("express");
var app = express();
const bodyParser = require("body-parser");
const multer = require('multer');

require("dotenv").config();

const port = process.env.PORT || 8080;

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'reports');
  },
 filename: (req, file, cb) => {
   cb(null, req.body.name + '-' + file.originalname);
 }
});

app.use(bodyParser.json());
app.use(multer({storage: fileStorage}).single('report'));
//app.use(bodyParser.urlencoded({ extended: false }));
const dbConfig = require("./util/mongoose");

const patientsRoute = require("./routers/patientsRoute");
const doctorsRoute = require("./routers/doctorsRoute");
const reportRoute = require("./routers/reportsRoute");

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-type, Authorization');
  next();
});

app.use("/api/patient", patientsRoute);
app.use("/api/doctor", doctorsRoute);
//app.use('/api/report',reportRoute);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
