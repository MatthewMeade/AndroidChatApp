import { Permissions, Notifications } from "expo";
import { AsyncStorage } from "react-native";

export default () => async dispatch => {
  // Check if permission already granted
  // const previousToken = await AsyncStorage.getItem("pushToken");
  // if (previousToken)
  //   return dispatch({
  //     type: "server/registerForNotifications",
  //     payload: { token: previousToken },
  //   });

  // Ask for permission
  const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);

  // User Denied
  if (status !== "granted");

  // Generate Token
  const token = await Notifications.getExpoPushTokenAsync();

  // Save token
  AsyncStorage.setItem("pushToken", token);

  Notifications.addListener(notification => {
    const {
      data: { text },
      origin,
    } = notification;

    if (origin === "received" && text) {
      Alert.alert("New Push Notification", text, [{ text: "Ok." }]);
    }
  });

  dispatch({
    type: "server/registerForNotifications",
    payload: { token },
  });
};
