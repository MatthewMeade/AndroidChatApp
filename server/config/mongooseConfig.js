const mongoose = require("mongoose");

const { mongoURI } = require("./keys");

mongoose
  .connect(mongoURI, { useNewUrlParser: true })
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch(err => console.log(err));
mongoose.set("useFindAndModify", false);

const User = require("../models/User");

module.exports = { mongoose, User };
