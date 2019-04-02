const server = require("http").createServer();
const io = require("socket.io")(server);

// Configure DB
const { User } = require("./config/mongooseConfig");

// Auth Functions
const { loginUserPassword, loginUserToken, logoutUser } = require("./functions/Auth");

const socketAction = async (client, action) => {
  console.log(`\nGOT ACTION: ${action.type} FROM ${client.id}`);
  // Client attempting to log in
  if (action.type === "server/signInPassword") {
    const { username, password } = action.payload;
    return loginUserPassword(username, password, client);
  }

  if (action.type === "server/signInToken") {
    const { token } = action.payload;
    return loginUserToken(token, client);
  }

  // Ensure socket user is logged in
  const user = await User.findOne({ connectionId: client.id });
  if (!user) {
    return emitToClient(client, "AUTH_ERROR", { err: "Not Authenticated" });
  }

  if (action.type === "server/getUsers") {
    const users = await User.find();
    return emitToClient(client, "GET_USERS", users);
  }
};

const emitToClient = (client, type, payload) => {
  // console.log(`EMITTING. Type: ${type} Payload: ${JSON.stringify(payload)}`);
  client.emit("action", { type, payload });
};

// Socket Config
io.on("connection", client => {
  client.on("action", action => {
    console.log("\nNew Connection:" + client.id);
    console.log("Open Connections:" + io.engine.clientsCount);
    socketAction(client, action);
  });
  client.on("disconnect", () => {
    console.log("\nClosed Connection:" + client.id);
    console.log("Open Connections:" + io.engine.clientsCount);
    logoutUser(client.id);
  });
});

const port = process.env.PORT || 5000;
server.listen(port);
