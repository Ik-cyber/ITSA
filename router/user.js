import express from "express";
import User from "../models/user.js";

const router = express.Router();

router.post("/user", async (req, res) => {
  try {
    const userData = new User(req.body);
    await userData.save();

    res.send("Successful");
  } catch (err) {
    res.send(err);
  }
});

router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    res.send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

export default router;
