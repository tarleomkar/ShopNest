import mongoose from "mongoose";

const connectDB = async () => {
    const mongoUri =
        process.env.MONGODB_URI ||
        process.env.LOCAL_MONGODB_URI ||
        "mongodb://127.0.0.1:27017/shopnest";

    try {
        await mongoose.connect(mongoUri);
        console.log("MongoDB Connected Successfully");
    } catch (error) {
        console.log("MongoDB Connection Failed", error.message);
        process.exit(1);
    }
};

export default connectDB;
