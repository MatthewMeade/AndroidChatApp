export const sendMessage = (to, text, from) => dispatch => {
  dispatch({
    type: "server/sendMessage",
    payload: { to, text },
  });

  dispatch({
    type: "NEW_MESSAGE",
    payload: { from, to, text, date: Date.now() },
  });
};
