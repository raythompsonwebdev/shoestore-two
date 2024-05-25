import mongoose from "mongoose";
import validator from "validator";

const { Schema, model, models } = mongoose;

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, "Full name is required"],
    minLength: [5, "Full name should be at least 5 characters long"],
    //maxLength: [30, 'Full name should be less than 30 characters'],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Email is required"],
    minLength: [8, "Email should be at least 8 characters long"],
    lowercase: true,
    trim: true,
    validate: (value: string) => {
      return validator.isEmail(value);
    },
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minLength: [12, "Password should be at least 12 characters long"],
    select: false,
  },
  date: {
    type: String,
    default: Date.now,
  },
  image: {
    type: String,
    required: true,
  },
  cartitems: [
    {
      type: [String],
      required: true,
    },
  ],
});

const User = models.User || model("User", UserSchema);

export default User;
