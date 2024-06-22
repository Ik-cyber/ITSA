import express from "express";
import bcrypt from "bcrypt";
import Staff from "../models/staff.js";
import sendEmail from "../utils/emails.js"
import jwt from "jsonwebtoken";
import generator from "generate-password";

import createSecretToken from "../utils/SecretJson.js";

const router = express.Router();

router.post("/staff", async (req, res) => {
  try {
    const headerData = req.header("Authorization");
    const tokenFromHeader = headerData.replace("JWT", "").trim();
    const subAdmin = jwt.verify(tokenFromHeader, process.env.TOKEN_KEY);
    const id = subAdmin.id;
    if (!id) {
      res.send("Please Authenticate.")
    }
    const { email, staffName, createdAt } = req.body;
    console.log(email, staffName, createdAt);
    const generatedPassword = generator.generate({
      length: 10,
      numbers: true,
    });
    const devices = [{
      deviceName : "DESK1",
      deviceCategory : "Desktop"
    },
    {
      deviceName : "DESK2",
      deviceCategory : "Desktop"
    }]
    console.log(generatedPassword);
    console.log(id);
    const existingUser = await Staff.findOne({ email });
    if (existingUser) {
      return res.json({ message: "User already exists" });
    }
    const staff = await Staff.create({
      subAdmin: id,
      email,
      password: generatedPassword,
      staffName,
      createdAt,
      devices
    });
    // console.log(jwt.sign("66749465aa53ae5d0767b225", process.env.TOKEN_KEY, {
    //   expiresIn: "1h",
    // }))
    const token = createSecretToken(staff._id);
    // res.cookie("token", token, {
    //   withCredentials: true,
    //   httpOnly: false,
    // });
    res.status(201).json({
      message: "Staff created successfully",
      success: true,
      staff,
      token,
    });
    console.log(staff)
    const data = {
      name : staff.staffName,
      password : generatedPassword
    }
    sendEmail(staff.email, data)
  } catch (error) {
    console.error(error);
  }
});

router.post("/staffs/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({ message: "All fields are required" });
    }
    const staff = await Staff.findOne({ email });
    if (!staff) {
      return res.json({ message: "Incorrect password or email" });
    }
    // const hashed = await bcrypt.hash(password, 8);
    // console.log(password, hashed, staff.password);
    const auth = await bcrypt.compare(password, staff.password);
    console.log(auth);
    if (!auth) {
      return res.json({ message: "Incorrect password " });
    }
    const token = createSecretToken(staff._id);
    res.status(201).json({
      message: "Staff logged in successfully",
      success: true,
      token: token,
    });
  } catch (error) {
    console.error(error);
  }
});

// router.post("/staff/change-password", async (req, res) => {
//   const headerData = req.header("Authorization");
//   const tokenFromHeader = headerData.replace("JWT", "").trim();
//   const data = jwt.verify(tokenFromHeader, process.env.TOKEN_KEY);
//   const id = data.id;
//   if (!id || !headerData) {
//     res.send("Please Authenticate.");
//   }
//   const { password } = req.body;
//   const hashed = await bcrypt.hash(password, 8);
//   console.log(hashed);
//   console.log(password);
//   console.log(id);
//   const updatedStaff = await Staff.findOneAndUpdate(
//     { _id: id },
//     {
//       password: hashed,
//     }
//   );
//   const staff = await Staff.findOne({ _id: id });

export default router;
