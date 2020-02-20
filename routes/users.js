const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/model");

router.get("/login", (req, res) => {
  res.render("login");
});
router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register", (req, res) => {
  User.register(
    { username: req.body.username },
    req.body.password,
    //this thing might be filling the username feild of the model we specified.

    // this thing might be filling the password feild of the model we specified.
    (err, user) => {
      if (err) {
        console.log(err);
        res.redirect("/users/register");
      } else {
        res.redirect("/users/login");
      }
    }
  );
});

router.post("/login", (req, res) => {
  //this loginUser is create to check in data base for this user with these credentials
  const loginUser = new User({
    username: req.body.username,
    password: req.body.password
  });
  //this login fuction is in express it self
  req.login(loginUser, err => {
    if (err) {
      console.log(err);
      res.redirect("users/login");
    } else {
      //this is passport authenticate method
      passport.authenticate("local")(req, res, () => {
        //its redirecting to the page which require athenticated permission
        res.redirect("/secrets");
      });
    }
  });
});

module.exports = router;
