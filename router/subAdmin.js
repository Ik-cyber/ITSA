import express from "express";
import bcrypt from "bcrypt";
import SubAdmin from "../models/subAdmin.js";

import createSecretToken from "../utils/SecretJson.js";

const router = express.Router();

router.post("/subAdmin", async (req, res) => {
  // try {
  //   const subAdminData = new SubAdmin(req.body);
  //   await subAdminData.save();

  //   res.send("Successful");
  // } catch (err) {
  //   res.send(err);
  // }

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
    // res.cookie("token", token, {
    //   withCredentials: true,
    //   httpOnly: false,
    // });
    res
      .status(201)
      .json({
        message: "Sub-admin created successfully",
        success: true,
        subAdmin,
        token,
      });
  } catch (error) {
    console.error(error);
  }

  // module.exports.Signup = async (req, res, next) => {
  //   try {
  //     const { email, password, username, createdAt } = req.body;
  //     const existingUser = await User.findOne({ email });
  //     if (existingUser) {
  //       return res.json({ message: "User already exists" });
  //     }
  //     const user = await User.create({ email, password, username, createdAt });
  //     const token = createSecretToken(user._id);
  //     res.cookie("token", token, {
  //       withCredentials: true,
  //       httpOnly: false,
  //     });
  //     res
  //       .status(201)
  //       .json({ message: "User signed in successfully", success: true, user });
  //     next();
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
});

router.post("/subAdmins/login", async (req, res) => {
  // try {
  //   const subAdmin = await SubAdmin.findByCredentials(
  //     req.body.email,
  //     req.body.password
  //   );
  //   res.send(subAdmin);
  // } catch (e) {
  //   res.status(400).send(e);
  // }

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
    //  res.cookie("token", token, {
    //    withCredentials: true,
    //    httpOnly: false,
    //  });
    res
      .status(201)
      .json({ message: "User logged in successfully", success: true, token });
  } catch (error) {
    console.error(error);
  }
});

export default router;
