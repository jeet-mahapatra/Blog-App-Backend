import {Router} from "express"
import {Blog} from "../models/blog.models.js"
import { Comment } from "../models/comment.model.js"
import multer from "multer"
import path from "path"
import { log } from "console"
 
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

router.get("/:id", async (req,res)=>{
  const blog = await Blog.findById(req.params.id).populate("createdBy")
  const comments = await Comment.find({ blogId: req.params.id}).populate("createdBy")

  return res.render("blog",{
    user: req.user,
    blog ,
    comments
  })
})

router.post("/comment/:blogId", async(req,res)=>{
  await Comment.create({
    content: req.body.content,
    blogId: req.params.blogId,createdBy: req.user._id
  })
  return res.redirect(`/blog/${req.params.blogId}`)
})


router.post("/", upload.single("coverImage") ,async (req,res)=>{
  const {title , body} = req.body
   const blog = await Blog.create({
      title ,
      body,
      createdBy : req.user._id,
      coverImageURL : `/upload/${req.file.filename}`
    })
    return res.redirect(`/blog/${blog._id}`)
})



export default router