require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const passport = require("passport");
const session = require("express-session");

const PORT = process.env.PORT || 3000;
const app = express();
const db = "mongodb://localhost:27017/userDB";

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));

require("./config/passport")(passport);

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(console.log("connected"));
mongoose.set("useCreateIndex", true);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/", require("./routes/index"));
app.use("/users", require("./routes/users"));

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
