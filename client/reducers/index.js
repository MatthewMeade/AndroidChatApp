import { combineReducers } from "redux";
import auth from "./authReducer";
import contacts from "./contactReducer";
import chat from "./chatReducer";
import typingUsers from "./typingReducer";

export default combineReducers({
  auth,
  contacts,
  chat,
  typingUsers,
});
