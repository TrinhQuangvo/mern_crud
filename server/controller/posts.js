import mongoose from "mongoose";
import PostMessage from "./../model/postMessage.js";

export const getPosts = async (req, res) => {
  let limit = 10;
  let page = req.query.page || 1;

  try {
    const allPost = await PostMessage.find();
    const postMessage = await PostMessage.find()
      .skip(limit * page - limit)
      .limit(limit);

    res.status(200).json({ 
      currentPage: parseInt(page),
      totalPage: Math.trunc(allPost.length / 10 + 1),
      postMessage,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
 
export const createPost = async (req, res) => {
  const post = req.body;
  const newPost = new PostMessage({
    ...post,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });
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

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  await PostMessage.findByIdAndRemove(id);

  res.json({ message: "Post deleted successfully." });
};

export const likePost = async (req, res) => {
  const { id: _id } = req.params;

  if (!req.userId) {
    return res.json({ message: "Unauthenticated" });
  }

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("No Post Found !");
  }

  const post = await PostMessage.findById(_id);

  const index = post.likes.findIndex((id) => {
    return id === String(req.userId);
  });

  if (index === -1) {
    // like
    post.likes.push(req.userId);
  } else {
    //dislike
    post.likes = post.likes.filter((id) => {
      id !== String(req.userId);
    });
  }

  const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, {
    new: true,
  });
  res.json(updatedPost);
};
