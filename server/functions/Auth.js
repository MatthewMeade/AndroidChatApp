const jwt = require("jsonwebtoken");

const mongoose = require("mongoose");
const User = mongoose.model("User");

const { emitByConnectionId, emitToClient } = require("./SocketFunctions");

module.exports.isAuthenticated = async client => {
  const user = await User.findOne({ connectionId: client.id });
  if (!user) {
    emitToClient(client, "AUTH_ERROR", { err: "Not Authenticated" });
    return false;
  }
  return user;
};

module.exports.loginUserPassword = async (client, { username, password }) => {
  let user = await User.findOne({ username });

  if (!user) {
    user = await new User({ username, password }).save();
  }

  if (!user.validPassword(password)) {
    return emitToClient(client, "LOGIN_FAIL", { err: "Incorrect Password" });
  }

  const payload = { id: user.id, name: user.name };
  jwt.sign(payload, "SECRET", { expiresIn: 1000 * 60 * 60 * 24 * 30 }, async (err, token) => {
    if (err) {
      return emitToClient(client, "LOGIN_FAIL", err);
    }

    user.token = token;

    await setUserStatus(user, true, client.id);
    return emitToClient(client, "LOGIN_SUCCESS", { token, username: user.username });
  });
};

module.exports.loginUserToken = async (client, { token }) => {
  // Find user by token
  const user = await User.findOne({ token });

  // Check if token is valid
  if (!user) {
    return emitToClient(client, "TOKEN_ERR", { err: "Invalid Token" });
  }

  // Authenticate user
  await setUserStatus(user, true, client.id);
  return emitToClient(client, "LOGIN_SUCCESS", { token, username: user.username });
};

module.exports.logoutUser = async connectionId => {
  const user = await User.findOne({ connectionId });
  await setUserStatus(user, false);
};

async function setUserStatus(user, isOnline, connectionId) {
  console.log("SETTING STATUS TO: " + isOnline);
  if (!user) return;

  user.online = isOnline;
  user.connectionId = isOnline && connectionId;
  await user.save();
}
