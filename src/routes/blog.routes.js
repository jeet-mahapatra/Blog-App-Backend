import {Router} from "express"
import {Blog} from "../models/blog.models.js"
import multer from "multer"
import path from "path"
 
const router = Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,path.resolve("./public/upload/"))
    },
    filename: function (req, file, cb) {
     const fileName = `${file.originalname}`
     cb(null, fileName);
    }
  })
  
  const upload = multer({ storage: storage })

router.get("/add-new",(req,res)=>{
    return res.render("addBlog",{
        user: req.user
    })
})

router.post("/", upload.single("coverImage") ,async (req,res)=>{
  const {title , body} = req.body
   const blog = await Blog.create({
      title ,
      body,
      createdBy : req.user._id,
      coverImageURL : `upload/${req.file.filename}`
    })
    return res.redirect(`/blog/${blog._id}`)
})



export default router