import { createStore, compose, applyMiddleware } from "redux";
import createSocketIoMiddleware from "redux-socket.io";
import io from "socket.io-client";
import { AsyncStorage } from "react-native";

import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import reducers from "../reducers";

let socket, store, persistor;

export const initStore = () => {
  socket = io("http://192.168.2.40:5000", {
    jsonp: false,
    transports: ["websocket"],
    pingIntreval: 1000,
  });
  let socketIoMiddleware = createSocketIoMiddleware(socket, "server/");

  const persistConfig = {
    key: "root",
    storage: AsyncStorage,
    blacklist: ["typingUsers", "loading", "auth"],
  };

  const persistedReducer = persistReducer(persistConfig, reducers);

  store = createStore(persistedReducer, {}, compose(applyMiddleware(thunk, socketIoMiddleware)));

  // window.navigator.userAgent = "react-native";

  socket.on("action", store.dispatch);

  store.subscribe(() => {
    console.log("new client state", store.getState());
  });

  store.dispatch({
    type: "LOADING",
    payload: true,
  });

  socket.on("connect", () => {
    console.log("SOCKET CONNECTED");
    store.dispatch({
      type: "LOADING",
      payload: false,
    });
  });

  socket.on("reconnecting", () => {
    store.dispatch({ type: "LOG_OUT" });
    store.dispatch({
      type: "LOADING",
      payload: true,
    });
  });

  socket.on("reconnect", async () => {
    const token = await AsyncStorage.getItem("token");
    store.dispatch({
      type: "server/signInToken",
      payload: { token },
    });

    store.dispatch({
      type: "LOADING",
      payload: false,
    });
  });

  persistor = persistStore(store);

  return { store, persistor };
};

export const getStore = () => {
  if (!store) return initStore();
  return { store, persistor };
};
