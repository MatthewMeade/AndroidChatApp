import { Notifications } from "expo";
import React, { Component } from "react";
import { createBottomTabNavigator, createAppContainer, createStackNavigator } from "react-navigation";
import { Provider } from "react-redux";
import { Icon } from "react-native-elements";
import { Alert } from "react-native";

import store from "./store";

// import registerForNotifications from "./services/pushNotifications";

import AuthScreen from "./screens/AuthScreen";
// import WelcomeScreen from "./screens/WelcomeScreen";
import ContactScreen from "./screens/ContactScreen";
// import DeckScreen from "./screens/DeckScreen";
// import SettingsScreen from "./screens/SettingsScreen";
// import ReviewScreen from "./screens/ReviewScreen";

const MainNavigator = createBottomTabNavigator(
  {
    auth: {
      screen: AuthScreen,
      navigationOptions: {
        tabBarVisible: false,
      },
    },
    main: {
      screen: createBottomTabNavigator(
        {
          contacts: ContactScreen,
        },
        {
          tabBarOptions: { labelStyle: { fontSize: 12 } },
        }
      ),
      navigationOptions: {
        tabBarVisible: false,
      },
    },
  },
  {
    navigationOptions: {
      tabBarVisible: false,
    },
    lazy: true,
  }
);

const AppContainer = createAppContainer(MainNavigator);

class App extends Component {
  componentDidMount() {
    // registerForNotifications();
    Notifications.addListener(notification => {
      const {
        data: { text },
        origin,
      } = notification;

      if (origin === "received" && text) {
        Alert.alert("New Push Notification", text, [{ text: "Ok." }]);
      }
    });
  }
  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}

export default App;
