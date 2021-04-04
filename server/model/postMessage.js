import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  title: String,
  message: String,
  name:String,
  creator: String,
  tags: [String],
  selectedFile: String,
  likes: {
    type: [String],
    default: [],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});
// Biên dịch mô hình từ schema

const PostMessage = mongoose.model("PostMessage", postSchema);

export default PostMessage;
