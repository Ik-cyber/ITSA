import express from "express";
import NewCompany from "../models/companySignUp.js";

const router = express.Router();

router.post("/company/signup", async (req, res) => {
  try {
    const companyData = new NewCompany(req.body);
    await companyData.save();

    res.send("Successful");
  } catch (err) {
    res.send(err);
  }
});

router.post("/company/signin", async (req, res) => {
  try {
    const companyData = await NewCompany.findByCredentials(
      req.body.email,
      req.body.password
    );
    res.send(companyData);
  } catch (e) {
    res.status(400).send(e);
  }
});

export default router;
