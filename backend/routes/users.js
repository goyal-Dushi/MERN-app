// jshint esversion:6

const router = require("express").Router();
let User = require("../models/user.model");

router.route("/").get((req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error : " + err));
});

router.route("/add").post((req, res) => {
  const uname = req.body.username;
  const newUser = new User({
    username: uname,
  });

  newUser
    .save()
    .then(() =>
      res.json({
        show: true,
        msg: "New user has been created Successfully!",
        type: "success",
      })
    )
    .catch((err) =>
      res.status(400).json("Error while creating new User: " + err)
    );
});

module.exports = router;
