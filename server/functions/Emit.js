export const emitByConnectionId = (id, type, payload) => {
  console.log(`EMITTING. Type: ${type} Payload: ${JSON.stringify(payload)}`);
  io.to(id).emit("action", { type, payload });
};

export const emitToClient = (client, type, payload) => {
  console.log(`EMITTING. Type: ${type} Payload: ${JSON.stringify(payload)}`);
  client.emit("action", { type, payload });
};
