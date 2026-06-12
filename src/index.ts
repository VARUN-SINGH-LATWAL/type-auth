import express from "express";
import type {Express} from "express"
import {connectDB} from "./DB/access.js";
import auth from "./routers/auth.route.js"
connectDB()
const app :Express = express()

app.use(express.json())

// router start here 
app.use("/api/auth",auth)


app.listen(3000,()=>{
    console.log(`Server is runing port ${3000}`)
})