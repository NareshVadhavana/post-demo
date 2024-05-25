import mongoose, { Document} from "mongoose";
import { UserI } from "../interfaces/user.interface";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  }
}, { timestamps: true });

const UserModel = mongoose.model<UserI & Document>("User", UserSchema);

export default UserModel;