import { AsyncStorage } from "react-native";

import { GET_USERS } from "../actions/types";

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS:
      return action.payload;

    default:
      return state;
  }
};
