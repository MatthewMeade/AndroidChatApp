import { combineReducers } from "redux";
import auth from "./authReducer";
import contacts from "./contactReducer";
// import likedJobs from "./likesReducer";

export default combineReducers({
  auth,
  contacts,
  // likedJobs,
});
