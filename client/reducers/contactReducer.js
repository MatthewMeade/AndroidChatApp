import { AsyncStorage } from "react-native";

import { GET_USERS } from "../actions/types";

const initialState = { searchResults: [], contacts: [] };

export default (state = initialState, action) => {
  switch (action.type) {
    case "SEARCH_RESULTS":
      return { ...state, searchResults: action.payload };

    case "GET_USERS":
      return { ...state, contacts: action.payload };

    default:
      return state;
  }
};
