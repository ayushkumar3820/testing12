import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const db = await mongoose.connect(process.env.MONGODB_URL);
    console.log(`Database are connected successfully ${db.connection.host}`);
  } catch (error) {
    console.log("Database are not connected ", error);
    process.exit(1);
  }
};
