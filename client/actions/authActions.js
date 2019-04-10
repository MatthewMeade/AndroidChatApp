import { AsyncStorage } from "react-native";

export const SignInPassword = (username, password) => ({
  type: "server/signInPassword",
  payload: { username, password },
});

export const SignInToken = token => ({
  type: "server/signInToken",
  payload: { token },
});

export const signOut = () => ({
  type: "server/logOut",
});

export const signOutLocal = () => ({
  type: "LOG_OUT",
});
export const loadStoredAuth = () => async dispatch => {
  const [name, token] = await Promise.all([AsyncStorage.getItem("username"), AsyncStorage.getItem("token")]);
  dispatch({
    type: "LOGIN_SUCCESS",
    payload: { name, token },
  });
};
