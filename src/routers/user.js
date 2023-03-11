const express = require("express");
const router = new express.Router();
const User = require("../models/user");

const randomNames = ["Kai", "Snape", "Zoid", "Sagar"];
const randomAdjectives = ["Cool", "Happy", "Sexy"];

router.get("/profile", async (req, res) => {
  let walletAddress = req.query.walletAddress;
  if (!walletAddress) {
      return res.send(400)
  }
  walletAddress = walletAddress.toString().toLowerCase()

  console.log(`walletAdd: ${walletAddress}`)
  try {
    const user = await User.findByWalletAddress(walletAddress);
    console.log(user)
    res.status(200).send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("/login", async (req, res) => {
  const { walletAddress } = req.body;
  
  let user = await User.findByWalletAddress(walletAddress);
  if (user) {
    return res.status(200).send(user);
  }

  try {
    let name =
      randomAdjectives[Math.floor(randomAdjectives.length * Math.random())] + ' '
      randomNames[Math.floor(randomNames.length * Math.random())];
    user = new User({
      walletAddress: walletAddress,
      name: name,
      joined: Date.now(),
    });
    user = await user.save();
    return res.status(201).send(user);
  } catch (e) {
    return res.status(400).send(e);
  }
});

router.post("/update", async (req, res) => {
  const { user } = req.body;
  const walletAddress = user.walletAddress;
  console.log(walletAddress);

  try {
    let result = await User.findOneAndUpdate({ walletAddress }, user, {
      new: true,
    });

    res.status(200).send(result);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("/updateRating", async (req, res) => {
  const { rating, walletAddress } = req.body;

  try {
    let user = await User.findByWalletAddress(walletAddress);
    user.rating.sum = user.rating.sum + rating;
    user.rating.count++;
    user = await user.save();
    res.status(201).send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/search", async (req, res) => {
  let term = req.query.term;

  term = new RegExp(term, "i");
  try {
    //console.log("try");
    const users = await User.find({ name: { $regex: term } });

    return res.status(200).send(users);
  } catch (e) {
    return res.status(400).send(e);
  }
});

module.exports = router;
