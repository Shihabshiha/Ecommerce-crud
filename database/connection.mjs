import configKeys from "../config/configKeys.mjs";
import mongoose from "mongoose";


async function connectDb(){
  try{
    await mongoose.connect(configKeys.DB_CONNECTION_STRING)
    console.log("Data base is connected")
  }catch(err){
    console.log("Error in connecting db",err)
  }
}

export default connectDb;



