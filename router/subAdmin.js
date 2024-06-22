import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import SubAdmin from "../models/subAdmin.js";
import Staffs from "../models/staff.js";

import createSecretToken from "../utils/SecretJson.js";
import Staff from "../models/staff.js";

const router = express.Router();

router.post("/subAdmin", async (req, res) => {
  try {
    const { email, password, adminName, createdAt } = req.body;
    const existingUser = await SubAdmin.findOne({ email });
    if (existingUser) {
      return res.json({ message: "User already exists" });
    }
    const subAdmin = await SubAdmin.create({
      email,
      password,
      adminName,
      createdAt,
    });
    const token = createSecretToken(subAdmin._id);
    res.status(201).json({
      message: "Sub-admin created successfully",
      success: true,
      subAdmin,
      token,
    });
  } catch (error) {
    console.error(error);
  }
});

router.post("/subAdmins/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({ message: "All fields are required" });
    }
    const subAdmin = await SubAdmin.findOne({ email });
    if (!subAdmin) {
      return res.json({ message: "Incorrect password or email" });
    }
    const auth = await bcrypt.compare(password, subAdmin.password);
    if (!auth) {
      return res.json({ message: "Incorrect password or email" });
    }
    const token = createSecretToken(subAdmin._id);
    res
      .status(201)
      .json({
        message: "User logged in successfully",
        success: true,
        subAdmin,
        token,
      });
  } catch (error) {
    console.error(error);
  }
});

router.get("/subAdmin/staffs", async (req, res) => {
  const headerData = req.header("Authorization");
  const token = headerData.replace("JWT", "").trim();
  const id = jwt.verify(token, process.env.TOKEN_KEY);
  console.log(id);
  const subAdmin = await SubAdmin.findById(id);
  // // await subAdmin.populate("staffs").execPopulate();
  subAdmin.staffs = await Staffs.find({ subAdmin: id });
  res.send(subAdmin.staffs);
});

router.post("/addDevice", async (req, res) => {
  const { staffName, newDevice } = req.body
  const staff = await Staff.findOne({staffName : staffName})
  if (!Staff) {
    res.send("Staff Not Found.")
  }
  await staff.devices.push(newDevice)
  console.log( staff)
  await staff.save()
  const updatedStaff = await Staff.findOne({staffName : staffName})
 res.send(updatedStaff)
})

export default router;
