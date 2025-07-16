import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  id: String,
  email: String,
  username: String,
  image: String,
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);
export default User;