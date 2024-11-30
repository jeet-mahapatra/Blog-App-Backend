import mongoose,{Schema} from "mongoose"


const blogSchema = Schema({
     title:{
        type: String,
        required: true
     },
     body:{
        type: String,
        required: true
     },
     coverImageURL:{
        type: String
     },
     createdBy:{
        type: Schema.Types.ObjectId,
        ref: "User"
     }
},{timestamps: true}
)

export const Blog = mongoose.model("Blog", blogSchema)