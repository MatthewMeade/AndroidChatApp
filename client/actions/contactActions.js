export const getContacts = () => ({
  type: "server/getUsers",
});

export const searchUsers = searchValue => ({
  type: "server/searchUsers",
  payload: searchValue,
});
