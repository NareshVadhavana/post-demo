import mongoose, { Document} from "mongoose";
import { PostI } from "../interfaces/post.interface";

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true
  },
  status: {
    type: String,
    required: true
  },
  latitude: {
    type: String,
    required: true
  },
  longitude: {
    type: String,
    required: true
  }
}, { timestamps: true });

const PostModel = mongoose.model<PostI & Document>("Post", PostSchema);

export default PostModel;