const jwt = require("jsonwebtoken");
const Patient = require("../models/patients");
require("dotenv").config();
const patientauth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const patient = await Patient.findOne({
      _id: decoded._id,
      //   "tokens.token": token,
    });

    if (!patient) {
      throw new Error();
    }

    // req.token = token;
    req.patient = patient;
    // console.log(req.body.patient)
    next();
  } catch (e) {
    res.status(401).send({ error: "Please authenticate." });
  }
};

module.exports = patientauth;
