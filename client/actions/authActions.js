export const SignInPassword = (username, password) => ({
  type: "server/signInPassword",
  payload: { username, password },
});

export const SignInToken = token => ({
  type: "server/signInToken",
  payload: { token },
});
