import { createStore, compose, applyMiddleware } from "redux";
import createSocketIoMiddleware from "redux-socket.io";
import io from "socket.io-client";
import { AsyncStorage } from "react-native";

import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import reducers from "../reducers";

console.log("NEW SOCKET");
let socket = io("http://192.168.2.40:5000", {
  jsonp: false,
  transports: ["websocket"],
});
let socketIoMiddleware = createSocketIoMiddleware(socket, "server/");

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  blacklist: ["typingUsers"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = createStore(persistedReducer, {}, compose(applyMiddleware(thunk, socketIoMiddleware)));

window.navigator.userAgent = "react-native";

socket.on("action", store.dispatch);

store.subscribe(() => {
  // console.log("new client state", store.getState());
});

let persistor = persistStore(store);

export default { store, persistor };
