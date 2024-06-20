import express from "express";
import jsonwebtoken from "jsonwebtoken";

const router = express.Router();

router.get("/pcApiTest", (req, res) => {
    res.send({
        "data" : "Hello from Server."
    })
})

router.post("/pcApiTest/signup", (req, res) => {
    const { name, password} = req.body


})

router.post("/pcApiTest", async (req, res) => {
    const data = await req.body
    console.log(data.data)
    res.send("Successful")
})


export default router;
