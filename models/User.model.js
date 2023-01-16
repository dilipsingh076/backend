const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: String,
  email: String,
  gender: { type: String, enum: ["Male", "Female"] },
  password: String,
});

const UserModel = mongoose.model("user", userSchema);

module.exports = {
  UserModel,
};
