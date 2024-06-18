import express from "express"
import dotenv from "dotenv"
import userRouter from "./router/user.js"
import subAdminRouter from "./router/subAdmin.js"
import testRouter from "./router/testRouter.js"
import companySignUpRouter from "./router/companySignUp.js"


import bodyParser from "body-parser"
import cors from "cors"

dotenv.config()

import "./db/mongDB.js"


const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

app.use(userRouter) 
app.use(subAdminRouter) 
app.use(companySignUpRouter) 


app.use(testRouter)

const PORT = process.env.PORT

app.listen(PORT, console.log(`Serving at Port: ${PORT}`))