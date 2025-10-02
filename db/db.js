import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config();
const connectDb = async()=>{
    const URL = process.env.DB_URL;
    try{
      await mongoose.connect(URL,{useNewUrlParser:true,useUnifiedTopology:true}) ;
      console.log("Database connected successfully") 
    }
    catch(err){
        console.log("Error while connecting databse ",err)
    }
}

export default connectDb;