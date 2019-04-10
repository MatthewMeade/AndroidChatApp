const { Expo } = require("expo-server-sdk");
const mongoose = require("mongoose");
const User = mongoose.model("User");

module.exports.registerForNotifications = async (user, { token }) => {
  const otherTokenUsers = await User.find({ notificationToken: token });

  otherTokenUsers.forEach(u => {
    u.notificationToken = "";
    u.save();
  });

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
