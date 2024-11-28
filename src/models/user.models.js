import mongoose , {Schema} from "mongoose"
import bcrypt from "bcrypt"
import { createTokenForUser } from "../utils/auth.utils.js"

const userSchema = new Schema(
    {
        fullName:{
            type: String,  
        },
        email:{
            type: String,
            required:true,
            unique:true
        },
        
        password:{
            type: String,
            required:true
        },
        profileImage:{
            type:String,
            default: "/images/default.png"
        },
        role:{
            type:String,
            enum: ["USER", "ADMIN"],
            default: "USER"
        }      

    },{timestamps:true}
)


userSchema.pre("save",async function(next){
    if (this.isModified("password")){
        this.password = await bcrypt.hash(this.password,10)
        next()  
    }       
})

userSchema.static("matchPasswordAndGenerateToken", async function (email,password){
    const user = await this.findOne({email})
    if(!user) {
        throw new Error("User is not Found")
    }

    const isPasswordValid = await bcrypt.compare(password,user.password)

    if(!isPasswordValid) throw new Error("Incorrect PassWord")

    const token = createTokenForUser(user)
    return token

})



export const User = mongoose.model("User", userSchema)
