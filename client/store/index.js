// import { createStore, compose, applyMiddleware } from "redux";
// import createSocketIoMiddleware from "redux-socket.io";
// import io from "socket.io-client";
// import axios from "axios";

// import thunk from "redux-thunk";
// // import { persistStore, autoRehydrate } from "redux-persist";
// // import { AsyncStorage } from "react-native";
// import reducers from "../reducers";

// let socket = io("http://192.168.2.40:5000", {
//   query: "session_id=" + "test123",
//   jsonp: false,
//   transports: ["websocket"],
// });
// let socketIoMiddleware = createSocketIoMiddleware(socket, "server/");

// const store = createStore(
//   reducers,
//   {},
//   compose(
//     applyMiddleware(thunk, socketIoMiddleware)
//     // autoRehydrate()
//   )
// );

// // const store = applyMiddleware(socketIoMiddleware)(createStore)(reducers);

// // persistStore(store, { storage: AsyncStorage, whitelist: ["likedJobs"] });

// window.navigator.userAgent = "react-native";

// socket.on("action", store.dispatch);

// store.subscribe(() => {
//   console.log("new client state", store.getState());
// });

// export default store;

import { createStore, compose, applyMiddleware } from "redux";
import createSocketIoMiddleware from "redux-socket.io";
import io from "socket.io-client";
import { AsyncStorage } from "react-native";

import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import reducers from "../reducers";

let socket = io("http://192.168.2.40:5000", {
  query: "session_id=" + "test123",
  jsonp: false,
  transports: ["websocket"],
});
let socketIoMiddleware = createSocketIoMiddleware(socket, "server/");

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

// const store = applyMiddleware(socketIoMiddleware)(createStore)(reducers);

// persistStore(store, { storage: AsyncStorage, whitelist: ["likedJobs"] });

const store = createStore(persistedReducer, {}, compose(applyMiddleware(thunk, socketIoMiddleware)));

window.navigator.userAgent = "react-native";

socket.on("action", store.dispatch);

store.subscribe(() => {
  console.log("new client state", store.getState());
});

let persistor = persistStore(store);

export default { store, persistor };
