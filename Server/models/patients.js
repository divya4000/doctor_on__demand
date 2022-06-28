const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const patientSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  lastVisitedDate: {
    type: String,
    required: false,
  },
  age: {
    type: String,
    required: false,
  },
  address: {
    type: String,
    required: false,
    trim: true,
  },
  doctorId: {
    type: String,
    // type: String,
    required: false,
    ref: "doctors",
  },
  age: {
    type: String, 
    required: false,
  },
  diagnosis: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  study: {
    type: String,
    required: false
  },
  advice: {
    type: String,
    required: false,
  },
  startDate: {
    type: String,
    required: false,
  },
  endDate: {
    type: String,
    required: false,
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
  medicines: [
    {
      dose: {
        type: String,
        required: false,
      },
      name: {
        type: String,
        required: false,
      },
      time: {
        type: String,
        required: false,
      }
    },
  ],
  status: {
    type: String,
    required: false,
  },
  gender: {
    type: String,
    required: false,
  },
  prescription: {
    type: String,
    required: false,
  },
  doctorName: {
    type: String,
    required: false,
  },
  mobile: {
    type: String, 
    required: false,
  }
});

patientSchema.methods.toJSON = function () {
  const patient = this;
  const patientObject = patient.toObject();
  delete patientObject.password;
  // delete patientObject.tokens;
  return patientObject;
};

patientSchema.methods.generateAuthToken = async function () {
  const patient = this;
  console.log(patient._id.toString());
  const token = jwt.sign(
    { _id: patient._id.toString() },
    process.env.JWT_SECRET
  );
  // patient.tokens = patient.tokens.concat({ token });
  // await patient.save();

  return token;
};

patientSchema.statics.findByCredentials = async (email, password) => {
  const patient = await Patient.findOne({ email: email });
  if (!patient) {
    throw new Error("Unable to login");
  }

  console.log(password, patient.password);
  const isMatch = await bcrypt.compare(password, patient.password);
  console.log(isMatch);
  if (!isMatch) {
    throw new Error("Unable to login");
  }
  return patient;
};

const Patient = mongoose.model("patients", patientSchema);
module.exports = Patient;
