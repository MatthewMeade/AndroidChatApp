import { AsyncStorage } from "react-native";

import { LOGIN_SUCCESS, LOGIN_FAIL } from "../actions/types";

const initialState = { messages: [] };

export default (state = initialState, action) => {
  switch (action.type) {
    case "NEW_MESSAGE":
      const newMsg = action.payload;
      if (state.messages.indexOf(newMsg) >= 0) return state;

      return { messages: [...state.messages, newMsg] };

    default:
      return state;
  }
};
