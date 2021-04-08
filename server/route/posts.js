import express from "express";
import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  likePost,
  getSearchPosts,
} from "./../controller/posts.js";
import auth from "./../middleware/auth.js";
// import faker from "faker";
// import PostMessage from "./../model/postMessage.js";

const router = express.Router();

router.get("/", getPosts);
router.get("/search", getSearchPosts);

router.post("/", auth, createPost);
router.patch("/:id", auth, updatePost);
router.delete("/:id", auth, deletePost);
router.patch("/:id/likePost", auth, likePost);

// fake data via Faker
// router.get("/fake-data", async (req, res, next) => {
//   for (let i = 0; i < 200; i++) {
//     const newPosts = new PostMessage();
//     newPosts.title = faker.commerce.productName();
//     newPosts.name = faker.name.firstName();
//     newPosts.selectedFile = faker.image.cats();
//     newPosts.message = faker.commerce.productDescription();
//     newPosts.save((err) => {
//       if (err) {
//         return next(err);
//       }
//     });
//   }
//   res.redirect("/");
// });

export default router;
