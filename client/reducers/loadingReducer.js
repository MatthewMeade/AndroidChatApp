const initialState = true;

export default (state = initialState, action) => {
  switch (action.type) {
    case "LOADING":
      return action.payload;

    // case "LOGIN_SUCCESS":
    // case "LOGIN_FAIL":
    //   return false;

    default:
      return state;
  }
};
