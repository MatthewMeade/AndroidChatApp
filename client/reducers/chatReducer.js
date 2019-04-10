import { AsyncStorage } from "react-native";

import { LOGIN_SUCCESS, LOGIN_FAIL } from "../actions/types";

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case "NEW_MESSAGE":
      const newMsg = action.payload;
      const newState = { ...state };

      const contact = newMsg.from;

      if (newState[contact] === undefined) {
        newState[contact] = [];
      }

      if (newState[contact].indexOf(newMsg) >= 0) return state;

      newState[contact] = [...newState[contact], newMsg];

      return newState;

    case "SEND_MESSAGE":
      const newSendMsg = action.payload;
      const newSendState = { ...state };

      const to = newSendMsg.to;

      if (newSendState[to] === undefined) {
        newSendState[to] = [];
      }

      if (newSendState[to].indexOf(newSendMsg) >= 0) return state;

      newSendState[to] = [...newSendState[to], newSendMsg];

      return newSendState;

    case "CLEAR_MESSAGES":
      return { ...initialState };

    default:
      return state;
  }
};
