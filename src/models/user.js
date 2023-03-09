const mongoose = require("mongoose");
const validator = require("validator");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },
  walletAddress: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    trim: true,
  },
  joined: {
    type: Date,
    required: true,
  },

  websiteLink: {
    type: String,
    trim: true,
  },
  externalLinks: [
    {
      name: {
        type: String,
      },
      url: {
        type: String,
      },
    },
  ],
  profileImageUrl: {
    type: String,
    default:
      "https://res.cloudinary.com/dkoxgwtku/image/upload/v1677942841/hitler_as_a_modern_hipster_evsecp.jpg",
  },
  coverImageUrl: {
    type: String,
    default:
      "https://res.cloudinary.com/dkoxgwtku/image/upload/v1677944863/cinematic_1_m9jygb.jpg",
  },
  rating: {
    sum: {
      type: Number,
      default: 0,
    },
    count: {
      type: Number,
      default: 0,
    },
  },
});

userSchema.statics.findByWalletAddress= async (walletAddress) => {
  const user = await User.findOne({ walletAddress });
  return user;
};

const User = mongoose.model("user", userSchema);

module.exports = User;
