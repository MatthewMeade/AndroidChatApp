// Auth Functions
const { loginUserPassword, loginUserToken, logoutUser, isAuthenticated } = require("./Auth");
const { sendMessage } = require("./Messages");
const { getUsers } = require("./Users");

const { registerForNotifications } = require("./Notifications");

module.exports = async (client, action) => {
  console.log(`\nGOT ACTION: ${action.type} FROM ${client.id}`);

  // Client attempting to log in
  if (action.type === "server/signInPassword") {
    return loginUserPassword(client, action.payload);
  }

  if (action.type === "server/signInToken") {
    return loginUserToken(client, action.payload);
  }

  // Ensure socket user is logged in
  const user = await isAuthenticated(client);
  if (!user) return;

  if (action.type === "server/getUsers") {
    return getUsers(client);
  }

  if (action.type === "server/sendMessage") {
    return sendMessage(user, action.payload);
  }

  if (action.type === "server/registerForNotifications") {
    return registerForNotifications(user, action.payload);
  }
};
