import express from "express";
import SubAdmin from "../models/subAdmin.js";

const router = express.Router();

router.post("/subAdmin", async (req, res) => {
  try {
    const subAdminData = new SubAdmin(req.body);
    await subAdminData.save();

    res.send("Successful");
  } catch (err) {
    res.send(err);
  }
});

router.post("/subAdmins/login", async (req, res) => {
  try {
    const subAdmin = await SubAdmin.findByCredentials(
      req.body.email,
      req.body.password
    );
    res.send(subAdmin);
  } catch (e) {
    res.status(400).send(e);
  }
});

export default router;
