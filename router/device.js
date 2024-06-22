import express from "express";
import SubAdmin from "../models/subAdmin.js";
import Staffs from "../models/staff.js";

import createSecretToken from "../utils/SecretJson.js";

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

export default router;
