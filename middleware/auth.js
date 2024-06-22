import jwt from "jsonwebtoken";
import SubAdmin from "../models/subAdmin.js";

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const tokenData = jwt.verify(token, process.env.TOKEN_KEY)
    console.log(tokenData)
    // console.log(token)
    // if (!token) {
    //     res.send("Please Authenticate.")
    // }
    const subAdmin = await new SubAdmin.findOne(tokenData.id._id)
    console.log(subAdmin)
    // req.subAdmin = subAdmin
    // if(!subAdmin) {
    //     throw new Error 
    // }

    // req.SubAdmin = subAdmin
        // req.token = token
    next()
  } catch (e) {
        res.status(401).send(e)
  }
};

export default auth;
