import React, { Component } from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";
import { Input, Button } from "react-native-elements";
import { AsyncStorage } from "react-native";

import { SignInPassword, SignInToken } from "../actions/authActions";

class AuthScreen extends Component {
  state = {
    username: "",
    password: "",
  };

  static navigationOptions = ({ navigation }) => ({
    title: "Sign In",
    tabBarIcon: ({ tintColor }) => {
      return <Icon name="description" size={30} color={tintColor} />;
    },
  });

  async componentDidMount() {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      this.props.SignInToken(token);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.authenticated) {
      this.props.navigation.navigate("map");
    }
  }

  submitClicked = () => {
    this.props.SignInPassword(this.state.username, this.state.password);
  };

  renderInfo() {
    if (this.props.error) {
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

const mapStateToProps = state => ({ authenticated: state.auth.authenticated, error: state.auth.err });

const mapDispatchToProps = { SignInPassword, SignInToken };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthScreen);
