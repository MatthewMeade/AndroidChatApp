const mongoose = require("mongoose");
const User = mongoose.model("User");

const { emitByConnectionId, emitToClient } = require("./SocketFunctions");

module.exports.getUsers = async client => {
  const users = await User.find().select("username online");
  emitToClient(client, "GET_USERS", users);
};
