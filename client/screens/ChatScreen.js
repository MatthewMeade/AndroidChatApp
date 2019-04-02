import React, { Component } from "react";
import { View, Text, TouchableNativeFeedback } from "react-native";
import { connect } from "react-redux";
import { Header, ListItem } from "react-native-elements";
import { Transition } from "react-navigation-fluid-transitions";

import { getContacts } from "../actions/contactActions";

class ChatScreen extends Component {
  componentWillMount() {}

  render() {
    return (
      <View>
        <Header
          leftComponent={{
            icon: "chevron-left",
            type: "font-awesome",
            color: "#fff",
            onPress: () => this.props.navigation.navigate("contacts"),
            underlayColor: "transparent",
          }}
          centerComponent={{ text: this.props.navigation.getParam("contact"), style: { color: "#fff" } }}
        />
        <Transition appear="right">
          <Text>Some Content</Text>
        </Transition>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  contacts: state.contacts,
});

const mapDispatchToProps = { getContacts };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatScreen);
