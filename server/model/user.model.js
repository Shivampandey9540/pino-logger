import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      allowNull: false,
    },

    username: {
      type: String,
      allowNull: false,
      unique: true,
    },
    password: {
      type: String,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", function (next) {
  const user = this;
  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash("B4c0//", salt, function (err, hash) {
      // Store hash in your password DB.
      user.password = hash;
      next();
    });
  });
});

const user = mongoose.model("user", userSchema);

export default user;
