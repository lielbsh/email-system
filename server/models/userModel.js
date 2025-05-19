const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
    },
    emailAddress: {
      type: String,
      required: true,
      unique: true,
      index: true,
      match: /.+\@.+\..+/,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 4,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 13);
  }
  next();
});

const user = mongoose.model("User", userSchema);
module.exports = user;
