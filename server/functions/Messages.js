const mongoose = require("mongoose");
const User = mongoose.model("User");

const { emitByConnectionId, emitToClient } = require("./SocketFunctions");

module.exports.sendMessage = async (user, { to, text }) => {
  const toUser = await User.findOne({ username: to });

  // No user with that username
  if (!toUser) {
    return console.log("ERROR: UNKNOWN USER " + to);
  }

  console.log("NEW MESSAGE:");
  console.log({ to, text });

  // User is online
  if (toUser.online) {
    return emitByConnectionId(toUser.connectionId, "NEW_MESSAGE", {
      from: user.username,
      to,
      text,
      date: Date.now(),
    });
  }
};
