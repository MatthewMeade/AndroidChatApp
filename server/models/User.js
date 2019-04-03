const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const uniqueValidator = require("mongoose-unique-validator");
const bcrypt = require("bcrypt");

const UserSchema = new Schema({
  username: { type: String, required: true },
  passwordHash: { type: String, required: true },
  date: { type: Date, default: Date.now },
  online: { type: Boolean, default: false },
  connectionId: { type: String, default: null },
  token: { type: String, default: null },
  queuedMessages: { type: Array, default: [] },
  notificationToken: { type: String, default: null },
});

UserSchema.plugin(uniqueValidator);

UserSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.passwordHash);
};

UserSchema.virtual("password").set(function(value) {
  this.passwordHash = bcrypt.hashSync(value, 12);
});

module.exports = model("User", UserSchema);
