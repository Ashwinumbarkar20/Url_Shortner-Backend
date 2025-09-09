
import mongoose from "mongoose";
const schema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
    },
    
},
{timeStamps:true}
)
const userModel=mongoose.model('User',schema)
export default userModel