import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name:{
        type:String,
        reaquired:true,
    },
    username:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        unique:true,
    }
})

const User = mongoose.model('user',userSchema);
export default User;