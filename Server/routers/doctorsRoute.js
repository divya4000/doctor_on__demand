const express = require("express");
const router = express.Router();
const Doctors = require("../models/doctors");
const Patients = require("../models/patients");
const bcrypt = require("bcryptjs");
const patientauth = require("../middleware/patientauth");
const {doctorauth} = require("../middleware/doctorauth");
const {generateID} = require('../util/GenerateId');

router.get("/getallpatients", doctorauth, async (req, res) => {
  try {
    console.log(req.body.doctor);
    const doctorId = req.body.doctor.doctorId;
    const allPatients = await Patients.find({doctorId: doctorId });
    console.log(allPatients)
    return res.status(200).send(allPatients);
  } catch (error) {
    // console.log("error");
    return res.status(400).json({ message: error });
  }
});
// Story.findOne({ title: "Casino Royale" })
//   .populate("author")
//   .exec(function (err, story) {
//     if (err) return handleError(err);
//     console.log("The author is %s", story.author.name);
//     // prints "The author is Ian Fleming"
//   });

router.post("/signup", async (req, res) => {
  const doctorId = generateID(6);
  console.log(doctorId);
  const doctor = new Doctors({...req.body, doctorId});
  try {
    doctor.password = await bcrypt.hash(req.body.password, 8);
    await doctor.save();
    // sendWelcomeEmail(doctor.email, doctor.name);
    // const token = await doctor.generateAuthToken();
    // res.status(201).send({ doctor, token });
    res.status(201).send("Doctor account created!!");
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("/login", async (req, res) => {
  try {
   //console.log(req.body.email, req.body.password);
    const doctor = await Doctors.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await doctor.generateAuthToken();
    res.send({ userId: doctor.doctorId, token: token});
  } catch (e) {
    res.status(400).send();
  }
});

module.exports = router;
