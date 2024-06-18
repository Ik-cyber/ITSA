// import express from "express";
// import User from "../models/user.js";

// const router = express.Router();

// router.post("/user", async (req, res) => {
//   try {
//     const userData = new User(req.body);
//     await userData.save();

//     res.send("Successful");
//   } catch (err) {
//     res.send(err);
//   }
// });

// router.post("/users/login", async (req, res) => {
//   try {
//     const user = await User.findByCredentials(
//       req.body.email,
//       req.body.password
//     );
//     res.send(user);
//   } catch (e) {
//     res.status(400).send(e);
//   }
// });

// export default router;


import express from "express";
import bcrypt from "bcrypt"
import Staff from "../models/staff.js";


import createSecretToken from "../utils/SecretJson.js"

const router = express.Router();

router.post("/staff", async (req, res) => {
  // try {
  //   const subAdminData = new SubAdmin(req.body);
  //   await subAdminData.save();

  //   res.send("Successful");
  // } catch (err) {
  //   res.send(err);
  // }

  try {
    const { email, password, staffName, createdAt } = req.body;
    const existingUser = await Staff.findOne({ email });
    if (existingUser) {
      return res.json({ message: "User already exists" });
    }
    const staff = await Staff.create({ email, password, staffName, createdAt });
    const token = createSecretToken(staff._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    res
      .status(201)
      .json({ message: "Sub-admin created successfully", success: true, staff });
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

router.post("/staffs/login", async (req, res) => {
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
    if(!email || !password ){
      return res.json({message:'All fields are required'})
    }
    const staff = await Staff.findOne({ email });
    if(!staff){
      return res.json({message:'Incorrect password or email' }) 
    }
    const auth = await bcrypt.compare(password, staff.password)
    if (!auth) {
      return res.json({message:'Incorrect password or email' }) 
    }
     const token = createSecretToken(staff._id);
     res.cookie("token", token, {
       withCredentials: true,
       httpOnly: false,
     });
     res.status(201).json({ message: "User logged in successfully", success: true });
  } catch (error) {
    console.error(error);
  }
});

export default router;
