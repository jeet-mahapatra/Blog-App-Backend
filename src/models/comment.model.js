import mongoose , {Schema} from "mongoose"

const commentSchema = new Schema({
    content:{
        type:String,
        required: true
    },
    blogId: {
        type:Schema.Types.ObjectId,
        ref:"Blog"
    },
    createdBy:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }

}, {timestamps:true})

export const Comment = mongoose.model("Comment", commentSchema)