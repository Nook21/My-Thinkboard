import mongoose from 'mongoose'

export const connectDB = async()=>{
    try {
       await mongoose.connect(process.env.MONGO_URI)
        console.log("MonogoDB Connected Successfully!");
        
    } catch (error) {
        console.log("Error with conncting with the databse",error);
        
        
    }
}