import express from "express";

const router = express.Router();

router.get("/pcApiTest", (req, res) => {
    res.send({
        "data" : "Hello from Server."
    })
})

router.post("/pcApiTest", (req, res) => {
    const data = req.body
    console.log(data.data)
    res.send("Successful")
})


export default router;
