const express = require("express");
const { spawnSync, spawn } = require('child_process');
// const User = require("../models/user");
const patientAuth = require("../middleware/patientauth");
const router = new express.Router();
const bcrypt = require("bcryptjs");
const fs = require('fs');
const jwt = require("jsonwebtoken");
const path = require('path');
const {getPDF} = require('../util/Pdf-parser');

var ObjectId = require("mongodb").ObjectId;
require("dotenv").config();

const Patient = require("../models/patients.js");
const { stringify } = require("querystring");

const test = async (req, res) => {
  try {
    
    const pathFile = '../reports/' + req.file.filename;
    const credentials = await getPDF(pathFile);
    console.log(credentials);
    const mlData = {patient1: {study: credentials.study, condition: " " + credentials.diagnosis}};
    // const mlData = {n: 'u'};
    fs.writeFile(path.resolve(__dirname, '../ML-Model/test.json'), JSON.stringify(mlData), err => console.log(err));
    let t;
    console.log('check')
    const p = path.resolve(__dirname, '../ML-MODEL/app.py')
    const childPython = spawn('python', [p, `1`]);
    childPython.stdout.on('data', data => {
        console.log(`On stdout data is: ${data}`);
        t = data;
    });

    childPython.stderr.on('data', data => {
        console.log(`On stderr data is: ${data}`);
    });

    childPython.on('close', async code => {
        console.log(`Child Process exited with code ${code}`);
        t = t.toString();
        console.log(t)
        const newValues = {
          ...req.body,
          ...credentials,
          status: t.trim()
        }
        const patient = new Patient(newValues);
        try{
          patient.password = await bcrypt.hash(req.body.password, 8);
          await patient.save();
          res.status(201).send("Patient successfully added!!");
        }
        catch(err){
          console.log(err);
          res.status(400).send(err);
        }
      });
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
};

router.get("/patients", async (req, res) => {
  res.send("Hey are you serching someone!!");
});

router.post("/signup", test);

router.post("/login", async (req, res) => {
  try {
    console.log(req.body.email, req.body.password);
    const patient = await Patient.findByCredentials(
      req.body.email,
      req.body.password
    );

    const token = jwt.sign(
      { _id: patient._id.toString() },
      process.env.JWT_SECRET_KEY
    );
    // res.send({ patient, token });
    // console.log(token);
    res.status(200).json({ token: token, userId: patient._id });
  } catch (e) {
    res.status(400).send("Login Failed!!");
  }
});

router.get("/", patientAuth, async (req, res) => {
  try{
    const _id = new ObjectId(req.patient._id);
    const patient = await Patient.find({ _id: _id });
    res.status(200).send(patient);
  }
  catch(err){
    console.log(err);
    res.status(500).send('Something went wrong!!');
  }
});

module.exports = router;
