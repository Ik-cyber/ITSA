import express from "express";
import bcrypt from "bcrypt";
import Staff from "../models/staff.js";
import Request from "../models/requests.js";
import sendEmail from "../utils/emails.js";
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
      res.send("Please Authenticate.");
    }
    const { email, staffName, createdAt } = req.body;

    const generatedPassword = generator.generate({
      length: 10,
      numbers: true,
    });
    const devices = [
      {
        deviceName: "DESK1",
        deviceCategory: "Desktop",
      },
      {
        deviceName: "DESK2",
        deviceCategory: "Desktop",
      },
    ];
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
      devices,
    });
    const token = createSecretToken(staff._id);
    res.status(201).json({
      message: "Staff created successfully",
      success: true,
      staff,
      token,
    });
    const data = {
      name: staff.staffName,
      password: generatedPassword,
    };
    sendEmail(staff.email, data);
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
      return res.json({ message: "Incorrect password or email." });
    }
    const auth = await bcrypt.compare(password, staff.password);
    if (!auth) {
      return res.json({ message: "Incorrect password or email. " });
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

router.post("/request", async (req, res) => {
  const headerData = req.header("Authorization");
  const tokenFromHeader = headerData.replace("JWT", "").trim();
  const staffId = jwt.verify(
    tokenFromHeader,
    process.env.TOKEN_KEY,
    function (err, decode) {
      if (err) {
        return "Invalid";
      }
      return decode;
    }
  );
  if (staffId === "Invalid") {
    res.send("Please SAuth");
  }
  const id = staffId.id;
  const { request, deviceName, status, category } = req.body;
  const requestMade = await Request.create({
    staff: id,
    deviceName: deviceName,
    category: category,
    status: status,
    request: request,
  });
  res.send("Added")
});

router.get("/requests", async (req, res) => {
  const headerData = req.header("Authorization");
  const token = headerData.replace("JWT", "").trim();
  try {
    const id = jwt.verify(token, process.env.TOKEN_KEY);
    const staff = await Staff.findById(id.id).populate("requests");
    staff.requests = await Request.find({ staff: id.id });

    res.send(staff.requests);
  } catch (e) {
    res.send(`Please Authenticate ${e}`);
  }
});

export default router;
