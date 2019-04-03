// Configure DB
require("./config/mongooseConfig");

// Init Server
const { server, io } = require("./functions/SocketFunctions").initServer();

// "Routing" logic
const socketAction = require("./functions/Routing");

const { logoutUser } = require("./functions/Auth");

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
