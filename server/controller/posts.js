import mongoose from "mongoose";
import PostMessage from "./../model/postMessage.js";

export const getPosts = async (req, res) => {
  try {
    const postMessage = await PostMessage.find();

    res.status(200).json(postMessage);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  const post = req.body;
  const newPost = new PostMessage(post);
  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("No Post Found! ");
  }
  const updatePost = await PostMessage.findByIdAndUpdate(_id, post, {
    new: true,
  });

  res.json(updatePost);
};

export const deletePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send("No Post Found !");
  }
  await PostMessage.findByIdAndRemove(id);

  res.json({ message: "Delete Success Fully!" });
};

export const likePost = async (req, res) => {
  const { id: _id } = req.params;
  console.log(req);
  console.log(req.params);
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("No Post Found !");
  }
  const post = await PostMessage.findById(_id);
  const updatedPost = await PostMessage.findByIdAndUpdate(
    _id,
    {
      likeCount: post.likeCount + 1,
    },
    { new: true }
  );
  res.json(updatedPost);
};
