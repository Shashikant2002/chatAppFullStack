import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import CookiesName from "../constants/cookiesToken.js";

const schema = new Schema(
  {
    user_id: {
      type: String,
      unique: true,
    },
    user_name: {
      type: String,
      unique: true,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    bio: {
      type: String,
    },
    avatar: {
      public_id: {
        type: String,
        // required: true,
      },
      url: {
        type: String,
        // required: true,
      },
    },
  },
  { timestamps: true }
);

schema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

schema.methods.comparePassword = async function (password) {
  // console.log("password", password);
  return await bcrypt.compare(password, this.password);
};

schema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, CookiesName?.JWT_USER_SECRET, {
    expiresIn: CookiesName?.JWT_USER_EXPIRE,
  });
};

export const UserSchema = model.User || model("User", schema);
