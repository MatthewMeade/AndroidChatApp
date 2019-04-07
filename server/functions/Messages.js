const mongoose = require("mongoose");
const User = mongoose.model("User");

const { emitByConnectionId, emitToClient } = require("./SocketFunctions");
const { sendNotification } = require("./Notifications");

module.exports.sendMessage = async (user, { to, text }) => {
  const toUser = await User.findOne({ username: to });

  // No user with that username
  if (!toUser) {
    return console.log("ERROR: UNKNOWN USER " + to);
  }

  console.log("NEW MESSAGE:");
  console.log({ to, text });

  const msg = {
    from: user.username,
    to,
    text,
    date: Date.now(),
  };

  // User is online
  if (toUser.online) {
    return emitByConnectionId(toUser.connectionId, "NEW_MESSAGE", msg);
  }

  const { notificationToken } = toUser;
  sendNotification(notificationToken, `New message from ${user.username}`);

  // User is offline
  toUser.queuedMessages.push(msg);
  toUser.save();
};
