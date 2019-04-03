import { combineReducers } from "redux";
import auth from "./authReducer";
import contacts from "./contactReducer";
import chat from "./chatReducer";

export default combineReducers({
  auth,
  contacts,
  chat,
  // likedJobs,
});
