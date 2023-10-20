import mongoose from "mongoose";

export const connectToDB = async()=>{
    const conn = await mongoose.connect(String(process.env.MONGO_URI));
    console.log(`Server connected to ${conn.connection.host}`);
}