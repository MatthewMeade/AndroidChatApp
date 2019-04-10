import { AsyncStorage } from "react-native";

import { GET_USERS } from "../actions/types";

const initialState = { searchResults: [], contacts: [] };

export default (state = initialState, action) => {
  switch (action.type) {
    case "SEARCH_RESULTS":
      return { ...state, searchResults: action.payload };

    case "GET_USERS":
      return { ...state, contacts: action.payload };

    case "UPDATE_ONLINE_STATUS":
      if (state.contacts.findIndex(c => c.username === action.payload.username) < 0) {
        return {
          contacts: [...state.contacts, { username: action.payload.username, online: action.payload.isOnline }],
        };
      }
      const newContacts = state.contacts.map(contact => {
        if (contact.username !== action.payload.username) return contact;

        contact.online = action.payload.isOnline;
        return contact;
      });

      return { ...state, contacts: newContacts };

    default:
      return state;
  }
};
