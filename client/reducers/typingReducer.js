const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_TYPING":
      // If contact is typing add them to the typing array
      if (action.payload.isTyping) {
        return [...state, action.payload.username];
      }

      // Otherwise, remove them
      return state.filter(username => username !== action.payload.username);

    default:
      return state;
  }
};
