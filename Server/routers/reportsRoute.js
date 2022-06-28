const express = require("express");
const router = express.Router();
const Doctors = require("../models/doctors");

router.get('/hello', async (req, res) => {
    console.log("hello");
    res.send('hello');
});



module.exports = router;