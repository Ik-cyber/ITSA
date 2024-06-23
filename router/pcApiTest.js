import express from "express";
import createSecretToken from "../utils/SecretJson.js";

const router = express.Router();

router.get("/pcApiTest", (req, res) => {
  res.send({
    data: "Hello from Server.",
  });
});

// router.get("/pcApiTest/signup", (req, res) => {
//   res.send({
//     sta: "sta",
//   });
// });

// router.post("/pcApiTest/signup", (req, res) => {
//   const { name } = req.body;
//   console.log(name);
//   const token = createSecretToken(name);

//   res.cookie("token", token, {
//     expires: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
//     httpOnly: true,
//     secure: true,
//   });
//   // res.header("token", token)
//   res.send({
//     token: token,
//   });
// });

router.post("/pcApiTest/signup", (req, res) => {
  const headerData = req.header("Authorization");
  const token = headerData.replace("JWT", "").trim();
  console.log(token)
  res.send("Success")
});

router.get("/pcApiTest/verify", (req, res) => {
  res.send({
    status: "online",
  });
});

router.get("/pcApiTest/cookie", (req, res) => {
 
  // res.cookie("table", "table", { maxAge: 900000, httpOnly: true });
});

export default router;
