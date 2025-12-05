import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  Name: { type: String, required: [true, "Name is Required"] },
  Email: { type: String, required: [true, "Email is Required"] },
  Password: { type: String, required: [true, "Password is Required"] },
  Age: { type: Number },
  Gender: { type: String },
  Phone: { type: Number },
  Role: { type: String, required: [true, "Role is Required"] },
  pfp: { type: String },
  Points: { type: Number },
});

const User = new mongoose.model("User", userSchema);
export default User;
