import { AsyncStorage } from "react-native";

import { LOGIN_SUCCESS, LOGIN_FAIL } from "../actions/types";

const initialState = { authenticated: false, err: null, username: "" };

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      console.log("LOGIN SUCCESS");

      AsyncStorage.setItem("token", action.payload.token);

      return { token: action.payload.token, username: action.payload.username, authenticated: true };

    case LOGIN_FAIL:
      console.log("LOGIN FAIL");
      return { token: null, authenticated: false, err: action.payload.err };

    case "LOG_OUT":
      return { ...initialState };

    default:
      return state;
  }
};
