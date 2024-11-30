import dotenv from "dotenv"
dotenv.config()

import path from "path"
import express from "express"
import userRoute from "./routes/user.routes.js"
import blogRoute from "./routes/blog.routes.js"

import { Blog } from "./models/blog.models.js"

import connectDB from "./db/index.db.js";
import cookieParser from "cookie-parser";
import { checkForAuthenticationCookie } from "./middlewares/auth.middlewares.js";

const app = express();



connectDB()
.then(()=>{
    app.on("error: " ,(error)=>{
        console.log("error" , error)
        throw error   
    })
    const PORT = process.env.PORT || 8004 
    app.listen(PORT , ()=>{
        console.log(`Server is Running at PORT : ${PORT}`)
    })
})
.catch((err)=>{
    console.log(`MongoDB connection Error::: ${err}`)    
})

app.set("view engine" , "ejs")
app.set("views", path.resolve("./src/views"))



app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(checkForAuthenticationCookie("token"))
app.use(express.static(path.resolve("./public")))

app.get("/",async (req,res)=>{
    const allblogs =  await Blog.find({})
    const user = req.user
    res.render("home", {
        user,
        blogs : allblogs
    })
})


app.use("/user",userRoute)
app.use("/blog",blogRoute)

