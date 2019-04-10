import React, { Component } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { connect } from "react-redux";
import { Input, Button, Overlay } from "react-native-elements";
import { AsyncStorage } from "react-native";

import { SignInPassword, SignInToken, loadStoredAuth } from "../actions/authActions";

import { getStore } from "../store";

import registerForNotifications from "..//services/pushNotifications";

class AuthScreen extends Component {
  state = {
    username: "",
    password: "",
    tryingToken: true,
  };

  static navigationOptions = ({ navigation }) => ({
    title: "Sign In",
    tabBarIcon: ({ tintColor }) => {
      return <Icon name="description" size={30} color={tintColor} />;
    },
  });

  async componentDidMount() {
    console.log("MOUNTED AUTH SCREEN");
    const token = await AsyncStorage.getItem("token");
    if (token) {
      this.setState({ tryingToken: true });
      console.log("SIGNING IN WITH TOKEN");
      this.props.SignInToken(token);
    } else {
      console.log("NO TOKEN, SETTING TO FALSE");
      this.setState({ tryingToken: false });
    }
  }

  async componentWillReceiveProps(nextProps) {
    console.log("NEW PROPS");
    console.log(nextProps);
    if (nextProps.authenticated) {
      console.log("AUTHENTICATED");

      this.props.registerForNotifications();

      const lastUsername = await AsyncStorage.getItem("username");
      if (lastUsername !== this.props.username) {
        const { store, persistor } = getStore();
        persistor.purge();
        store.dispatch({ type: "CLEAR_MESSAGES" });
      }

      AsyncStorage.setItem("username", this.props.username);

      this.props.navigation.navigate("contacts");
    }

    if (nextProps.error) {
      console.log("AUTH ERROR:", nextProps.error);
      this.setState({ tryingToken: false });
    }
  }

  submitClicked = () => {
    this.props.SignInPassword(this.state.username, this.state.password);
  };

  renderInfo() {
    if (this.props.error && this.props.error !== "Invalid Token") {
      console.log(this.props.error);
      return (
        <View>
          <View style={styles.errorContainerStyle}>
            <Text style={styles.errorStyle}>Incorrect Password</Text>
          </View>
          <Text style={styles.infoStyle}>
            If you did not create this count, the username you entered is already taken.
          </Text>
        </View>
      );
    }

    return (
      <View style={styles.infoContainerStyle}>
        <Text style={styles.infoStyle}>If you do not have an account one will be created</Text>
      </View>
    );
  }

  render() {
    console.log(this.state);
    console.log(this.props);
    if (this.state.tryingToken) {
      return (
        <View style={{ justifyContent: "center", flex: 1 }}>
          <ActivityIndicator size="large" animating={this.props.isLoading} color="red" />
        </View>
      );
    }

    return (
      <View style={styles.authContainer}>
        <Text style={styles.heading}>Sign In</Text>

        {this.renderInfo()}

        <Input
          placeholder="Username"
          leftIcon={{ type: "font-awesome", name: "user" }}
          {...inputStyles}
          value={this.state.username}
          onChangeText={username => this.setState({ username })}
        />
        <Input
          placeholder="Password"
          leftIcon={{ type: "font-awesome", name: "lock" }}
          {...inputStyles}
          value={this.state.password}
          onChangeText={password => this.setState({ password })}
        />

        <View>
          <Button
            title="Submit"
            type="outline"
            buttonStyle={styles.buttonStyle}
            titleStyle={{ color: "white" }}
            onPress={this.submitClicked}
          />
        </View>
      </View>
    );
  }
}

const styles = {
  authContainer: {
    flex: 1,
    display: "flex",
    alignItems: "center",

    paddingTop: 100,

    padding: 10,

    backgroundColor: "#3498db",
  },

  heading: {
    fontSize: 50,
    color: "white",
  },
  buttonStyle: {
    marginTop: 20,
    width: "100%",
    borderColor: "white",
  },

  infoContainerStyle: {
    marginTop: 10,
    marginBottom: 50,
  },

  errorContainerStyle: {
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "white",
    padding: 5,
    // width: "90%",
    borderRadius: 10,
  },

  infoStyle: {
    textAlign: "center",
    color: "#EEE",
  },

  errorStyle: {
    textAlign: "center",
    fontWeight: "bold",
    color: "red",
    fontSize: 20,
  },
};

const inputStyles = {
  leftIconContainerStyle: {
    marginRight: 10,
  },

  inputContainerStyle: {
    padding: 10,
    borderBottomWidth: 0,
  },
  containerStyle: {
    margin: 10,
    marginTop: 25,
    backgroundColor: "white",
    borderRadius: 20,
  },
  inputStyle: {
    color: "#3498db",
  },
};

const mapStateToProps = state => ({
  authenticated: state.auth.authenticated,
  error: state.auth.err,
  username: state.auth.username,
});

const mapDispatchToProps = { SignInPassword, SignInToken, loadStoredAuth, registerForNotifications };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthScreen);
