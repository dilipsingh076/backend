const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({
  title: String,
  body: String,
  device: { type: String, enum: ["PC", "TABLET", "MOBILE"] },
  userID: { type: String },
});

const PostModel = mongoose.model("Post", PostSchema);

module.exports = {
  PostModel,
};
