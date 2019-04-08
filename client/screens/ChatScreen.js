import React, { Component } from "react";
import { View, Text, ScrollView, KeyboardAvoidingView, TouchableNativeFeedback } from "react-native";
import { connect } from "react-redux";
import { Header, Input, Icon, Avatar } from "react-native-elements";
import { Transition } from "react-navigation-fluid-transitions";

import { getContacts } from "../actions/contactActions";
import { sendMessage } from "../actions/chatActions";
import Message from "../components/Message";

class ChatScreen extends Component {
  state = {
    messages: [],
    inputMessage: "",
  };

  renderMessages() {
    const contactUsername = this.props.navigation.getParam("contact");
    console.log("CONTACT USERNAME:", contactUsername);

    return (this.props.messages[contactUsername] || []).map(msg => (
      <Message key={msg.date} from={msg.from} text={msg.text} isOutgoing={msg.from === this.props.username} />
    ));
  }

  sendMessagePressed = () => {
    const to = this.props.navigation.getParam("contact");
    const { inputMessage } = this.state;
    const { username } = this.props;

    this.props.sendMessage(to, inputMessage, username);
    // this.setState({ messages: [...this.state.messages, { from: { username }, date: Date.now(), text: inputMessage }] });
    this.setState({ inputMessage: "" });
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
        <Header
          leftComponent={leftComponent}
          centerComponent={{ text: this.props.navigation.getParam("contact"), style: { color: "#fff" } }}
        />

        <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
          <View style={{ flexDirection: "column", justifyContent: "flex-end", flex: 1 }}>
            <ScrollView>{this.renderMessages()}</ScrollView>

            <View>
              <Input
                placeholder="Enter your message..."
                rightIcon={{
                  name: "sc-telegram",
                  type: "evilicon",
                  color: "#517fa4",
                  onPress: () => this.sendMessagePressed(),
                  size: 30,
                }}
                value={this.state.inputMessage}
                onChangeText={inputMessage => this.setState({ inputMessage })}
                multiline
              />
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  contacts: state.contacts,
  username: state.auth.username,
  messages: state.chat,
});

const mapDispatchToProps = { getContacts, sendMessage };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatScreen);
