const jwt = require("jsonwebtoken");

const mongoose = require("mongoose");
const User = mongoose.model("User");

// TODO: Refactor
function emitToClient(client, type, payload) {
  // console.log(`EMITTING. Type: ${type} Payload: ${JSON.stringify(payload)}`);
  client.emit("action", { type, payload });
}

function setUserStatus(user, isOnline, connectionId) {
  console.log("SETTING STATUS TO: " + isOnline);
  if (!user) return;

  user.online = isOnline;
  user.connectionId = isOnline && connectionId;
  user.save();
}

module.exports.loginUserPassword = async (username, password, client) => {
  let user = await User.findOne({ username });

  if (!user) {
    user = await new User({ username, password }).save();
  }

  if (!user.validPassword(password)) {
    return emitToClient(client, "LOGIN_FAIL", { err: "Incorrect Password" });
  }

  const payload = { id: user.id, name: user.name };
  jwt.sign(payload, "SECRET", { expiresIn: 1000 * 60 * 60 * 24 * 30 }, (err, token) => {
    if (err) {
      return emitToClient(client, "LOGIN_FAIL", err);
    }

    user.token = token;

    setUserStatus(user, true, client.id);
    return emitToClient(client, "LOGIN_SUCCESS", { token });
  });
};

module.exports.loginUserToken = async (token, client) => {
  // Find user by token
  const user = await User.findOne({ token });

  // Check if token is valid
  if (!user) {
    return emitToClient(client, "TOKEN_ERR", { err: "Invalid Token" });
  }

  // Authenticate user
  setUserStatus(user, true, client.id);
  return emitToClient(client, "LOGIN_SUCCESS", { token });
};

module.exports.logoutUser = async connectionId => {
  const user = await User.findOne({ connectionId });
  setUserStatus(user, false);
};
