let io;
let server;

module.exports.initServer = () => {
  server = require("http").createServer();
  io = require("socket.io")(server, { pingInterval: 1000 });
  return { io, server };
};

module.exports.emitByConnectionId = (id, type, payload) => {
  console.log(`EMITTING. Type: ${type} Payload: ${JSON.stringify(payload)}`);
  io.to(id).emit("action", { type, payload });
};

module.exports.emitToClient = (client, type, payload) => {
  console.log(`EMITTING. Type: ${type} Payload: ${JSON.stringify(payload)}`);
  client.emit("action", { type, payload });
};

module.exports.broadcast = (type, payload) => {
  console.log(`BROADCASTING. Type: ${type} Payload: ${JSON.stringify(payload)}`);
  io.emit("action", { type, payload });
};
