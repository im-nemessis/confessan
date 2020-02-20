const localStrategy = require("passport-local").Strategy;
const passportLocalMongoose = require("passport-local-mongoose");
const User = require("../models/model");
const mongoose = require("mongoose");

module.exports = function(passport) {
  passport.use(new localStrategy(User.authenticate()));

  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser());
};
