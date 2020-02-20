const express = require("express");
const router = express.Router();

const User = require("../models/model");

router.get("/", (req, res) => {
  res.render("home");
});
router.get("/secrets", (req, res) => {
  if (req.isAuthenticated()) {
    User.find({ secrets: { $ne: null } }, function(err, foundUsers) {
      if (err) {
        console.log(err);
      } else {
        if (foundUsers) {
          console.log(foundUsers);
          res.render("secrets", { usersWithSecrets: foundUsers });
        }
      }
    });
  } else {
    res.redirect("/users/login");
  }
});

router.get("/submit", (req, res) => {
  if (req.isAuthenticated()) {
    res.render("submit");
  } else {
    res.redirect("/users/login");
  }
});

router.post("/submit", (req, res) => {
  const secretSubmitted = req.body.secret;
  console.log(secretSubmitted);
  console.log(req.user);
  User.findById(req.user.id, (err, foundUser) => {
    if (err) {
      Console.log(err);
    } else {
      if (foundUser) {
        foundUser.secrets = secretSubmitted;
        foundUser.save();
        res.redirect("/secrets");
      }
    }
  });
});

router.get("/logout", (req, res) => {
  req.logOut();
  res.redirect("/users/login");
});
module.exports = router;
