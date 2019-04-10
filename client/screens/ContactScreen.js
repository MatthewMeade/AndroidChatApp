import React, { Component } from "react";
import { View, Text, TouchableNativeFeedback, BackHandler } from "react-native";
import { connect } from "react-redux";
import { Header, ListItem, Icon } from "react-native-elements";
import { Transition } from "react-navigation-fluid-transitions";

import { getContacts } from "../actions/contactActions";

class ContactScreen extends Component {
  componentWillMount() {
    console.log("MOUNTING CONTACT SCREEN");
    this.props.getContacts();

    BackHandler.addEventListener("hardwareBackPress", () => {
      this.props.navigation.navigate("contacts");
      return true;
    });
  }

  renderContacts() {
    console.log("RENDERING CONTACTS");
    const { chat, contacts } = this.props;

    if (!contacts) return;

    // Filter
    const filteredContacts = this.props.contacts
      .filter(contact => contact.username !== this.props.username)
      .filter(contact => chat[contact.username] !== undefined)
      .sort((a, b) => (chat[a.username].slice(-1)[0].date < chat[b.username].slice(-1)[0].date ? 1 : -1));

    return filteredContacts.map(contact => {
      const messages = chat[contact.username] || [];

      let lastMessageText;
      if (messages.length !== 0) {
        const { text, from } = messages[messages.length - 1];
        lastMessageText = `${from}: ${text}`;
      } else {
        lastMessageText = "No Messages Yet";
      }

      return (
        <TouchableNativeFeedback
          background={TouchableNativeFeedback.SelectableBackground()}
          onPress={() => this.props.navigation.navigate("chat", { contact: contact.username })}
          key={contact._id}
        >
          <View>
            <ListItem
              leftAvatar={{
                title: contact.username[0],
                source: { uri: `https://api.adorable.io/avatars/285/${contact.username}` },
                showEditButton: true,
                editButton: {
                  name: "globe",
                  type: "font-awesome",
                  color: contact.online ? "#00E500" : "#F00",
                  underlayColor: "#000",
                },
              }}
              title={contact.username}
              subtitle={lastMessageText}
              chevron
              containerStyle={{ backgroundColor: "transparent" }}
            />
          </View>
        </TouchableNativeFeedback>
      );
    });
  }

  render() {
    const leftComponent = (
      <TouchableNativeFeedback
        onPress={() => {
          this.props.navigation.navigate("settings");
        }}
      >
        <View style={{ padding: 15 }}>
          <Icon name="cog" type="font-awesome" color="white" />
        </View>
      </TouchableNativeFeedback>
    );

    const rightComponent = (
      <TouchableNativeFeedback
        onPress={() => {
          this.props.navigation.navigate("search");
        }}
      >
        <View style={{ padding: 15 }}>
          <Icon name="plus" type="font-awesome" color="white" />
        </View>
      </TouchableNativeFeedback>
    );
    return (
      <View>
        <Header
          centerComponent={{ text: "Online Users", style: { color: "#fff" } }}
          rightComponent={rightComponent}
          leftComponent={leftComponent}
        />

        <Transition appear="bottom" delay={false}>
          <View>{this.renderContacts()}</View>
        </Transition>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  contacts: state.contacts.contacts,
  username: state.auth.username,
  chat: state.chat,
});

const mapDispatchToProps = { getContacts };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContactScreen);
