const { Expo } = require("expo-server-sdk");

module.exports.registerForNotifications = async (user, { token }) => {
  console.log("TOKEN: ", token);
  user.notificationToken = token;
  user.save();
};

module.exports.sendNotification = async (to, body) => {
  const expo = new Expo();

  console.log(body);

  const message = { to, body, data: {}, sound: "default" };
  const chunks = expo.chunkPushNotifications([message]);
  chunks.forEach(chunk => expo.sendPushNotificationsAsync(chunk));
};
