import { AsyncStorage } from "react-native";

import React, { Component } from "react";
import { View, TouchableNativeFeedback, ToastAndroid } from "react-native";
import { connect } from "react-redux";

import { Text, Button, Icon, Header } from "react-native-elements";

import { clearMessages } from "../actions/chatActions";
import { signOut, signOutLocal } from "../actions/authActions";

class ChatScreen extends Component {
  state = {
    messages: [],
    inputMessage: "",
    isTyping: false,
  };

  onClearPress = () => {
    ToastAndroid.showWithGravity("Successfully cleared messages", ToastAndroid.LONG, ToastAndroid.CENTER);
    this.props.clearMessages();
  };

  onLogOutPress = async () => {
    ToastAndroid.showWithGravity("Logging Out", ToastAndroid.LONG, ToastAndroid.CENTER);
    await AsyncStorage.removeItem("token");

    this.props.signOut();
    this.props.signOutLocal();
    this.props.navigation.navigate("auth");
  };

  render() {
    const leftComponent = (
      <TouchableNativeFeedback
        onPress={() => {
          this.props.navigation.navigate("contacts");
        }}
      >
        <View style={{ padding: 15 }}>
          <Icon name="chevron-left" type="font-awesome" color="white" />
        </View>
      </TouchableNativeFeedback>
    );

    return (
      <View style={{ flex: 1 }}>
        <Header leftComponent={leftComponent} centerComponent={{ text: "Settings", style: { color: "#fff" } }} />

        <View style={styles.containerStyle}>
          <View style={styles.itemStyle}>
            <Button title="Clear Messages" buttonStyle={styles.buttonStyle} onPress={this.onClearPress} />
            <Text style={styles.textStyle}>This cannot be undone</Text>
          </View>

          <View style={styles.itemStyle}>
            <Button title="Log Out" buttonStyle={styles.buttonStyle} onPress={this.onLogOutPress} />
            <Text style={styles.textStyle}>Messages will be erased if another account logs in using this device</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = {
  containerStyle: {
    padding: 10,
  },

  buttonStyle: {
    backgroundColor: "#B33",
  },

  itemStyle: {
    marginBottom: 50,
  },

  textStyle: {
    textAlign: "center",
    marginTop: 10,
  },
};

const mapStateToProps = state => ({});

const mapDispatchToProps = { clearMessages, signOut, signOutLocal };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatScreen);
