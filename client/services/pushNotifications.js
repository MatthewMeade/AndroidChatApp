import { Permissions, Notifications } from "expo";
import { AsyncStorage } from "react-native";

export default async store => {
  // Check if permission already granted
  const previousToken = await AsyncStorage.getItem("pushToken");
  if (previousToken) return previousToken;

  // Ask for permission
  const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);

  // User Denied
  if (status !== "granted");

  // Generate Token
  const token = await Notifications.getExpoPushTokenAsync();
  // Save token
  AsyncStorage.setItem("pushToken", token);

  store.dispatch({
    type: "server/registerForNotifications",
    payload: { token },
  });
};
