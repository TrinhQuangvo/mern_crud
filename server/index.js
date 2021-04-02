import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

import postRoute from "./route/posts.js";
import userRoute from "./route/users.js";

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use(cors());

// middleware setup
app.use("/posts", postRoute);
app.use("/user", userRoute);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`SERVER IS RUNNING ON PORT : ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err.message);
  });
mongoose.set("useFindAndModify", false);
