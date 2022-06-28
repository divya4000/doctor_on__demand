const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const doctorSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid");
      }
    },
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 7,
    validate(value) {
      if (value.toLowerCase().includes("password")) {
        throw new Error("Password can not conatin 'password'");
      }
    },
  },
  doctorId: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: false,
    trim: true,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

doctorSchema.methods.toJSON = function () {
  const doctor = this;
  const doctorObject = doctor.toObject();
  delete doctorObject.password;
  // delete doctorObject.tokens;
  return doctorObject;
};

doctorSchema.virtual("getpatients", {
  ref: "patients",
  localField: "_id",
  foreignField: "doctorId",
});
doctorSchema.methods.generateAuthToken = async function () {
  const doctor = this;
  const token = jwt.sign(
    { _id: doctor._id.toString() },
    process.env.JWT_SECRET_KEY
  );
  // doctor.tokens = doctor.tokens.concat({ token });
  await doctor.save();

  return token;
};

doctorSchema.statics.findByCredentials = async (email, password) => {
  const doctor = await Doctors.findOne({ email: email });
  if (!doctor) {
    throw new Error("Unable to login");
  }

  console.log(password, doctor.password);
  const isMatch = await bcrypt.compare(password, doctor.password);
  console.log(isMatch);
  if (!isMatch) {
    throw new Error("Unable to login");
  }
  return doctor;
};
const Doctors = mongoose.model("doctors", doctorSchema);
module.exports = Doctors;
