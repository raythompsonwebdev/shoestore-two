import mongoose from "mongoose";

const { MONGODB_URI_PROD } = process.env;

if (!MONGODB_URI_PROD) {
  throw new Error("Invalid environment variable: MONGODB_URI");
}

const connectToMongoose = async () => {
  try {
    const { connection } = await mongoose.connect(MONGODB_URI_PROD);

    if (connection.readyState === 1) {
      return Promise.resolve(true);
    }
  } catch (error) {
    return Promise.reject(error);
  }
};

export default connectToMongoose;
