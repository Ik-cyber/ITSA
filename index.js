import express from "express";
import dotenv from "dotenv";
import userRouter from "./router/staff.js";
import subAdminRouter from "./router/subAdmin.js";
import testRouter from "./router/testRouter.js";
import companySignUpRouter from "./router/companySignUp.js";
import pcApiTest from "./router/pcApiTest.js";
import cors from "cors";
const app = express();

// const allowedOrigin = "http://localhost:5173/"; // Replace with your specific origin

const corsOptions = {
  origin: true,
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

import bodyParser from "body-parser";
// import cors from "cors";

dotenv.config();

import "./db/mongDB.js";

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(cors());

app.use(userRouter);
app.use(subAdminRouter);
app.use(companySignUpRouter);
app.use(pcApiTest);

app.use(testRouter);

const PORT = process.env.PORT;

app.listen(PORT, console.log(`Serving at Port: ${PORT}`));
