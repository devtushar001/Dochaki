import mongoose from "mongoose";

const  connectDB = async (mongo_url) => {
    try {
        await mongoose.connect(mongo_url);
        console.log("Database Connected Successfully "+mongo_url)
    } catch (error) {
        console.log("MongoDB Connection Failled", error);
    }
}

export default connectDB;