import { Notifications } from "expo";
import React, { Component } from "react";
import { createBottomTabNavigator, createAppContainer, createSwitchNavigator } from "react-navigation";
import { FluidNavigator, Transition } from "react-navigation-fluid-transitions";

import { Provider, connect } from "react-redux";
import { Icon } from "react-native-elements";
import { Alert } from "react-native";

import wat from "./store";
const { store, persistor } = wat;

import { PersistGate } from "redux-persist/integration/react";

import registerForNotifications from "./services/pushNotifications";

import AuthScreen from "./screens/AuthScreen";
// import WelcomeScreen from "./screens/WelcomeScreen";
import ContactScreen from "./screens/ContactScreen";
import ChatScreen from "./screens/ChatScreen";

const MainNavigator = FluidNavigator(
  {
    auth: {
      screen: AuthScreen,
    },
    contacts: {
      screen: ContactScreen,
    },
    chat: {
      screen: ChatScreen,
    },
  },
  {
    backBehavior: "order",
    transitionConfig: () => fromLeft(),
  }
);

const AppContainer = createAppContainer(MainNavigator);

class App extends Component {
  componentDidMount() {
    registerForNotifications(store);
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
        <PersistGate loading={null} persistor={persistor}>
          <AppContainer />
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
