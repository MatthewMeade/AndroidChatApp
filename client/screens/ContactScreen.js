import React, { Component } from "react";
import { View, Text, TouchableNativeFeedback } from "react-native";
import { connect } from "react-redux";
import { Header, ListItem } from "react-native-elements";

import { getContacts } from "../actions/contactActions";

class ContactScreen extends Component {
  componentWillMount() {
    this.props.getContacts();
  }

  renderContacts() {
    if (!this.props.contacts) return;

    console.log(this.props.contacts);
    return this.props.contacts.map(contact => (
      <TouchableNativeFeedback
        background={TouchableNativeFeedback.SelectableBackground()}
        onPress={() => console.log("BUTTON PRESSED")}
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
            subtitle={"LAST MESSAGE HERE"}
            chevron
            containerStyle={{ backgroundColor: "transparent" }}
          />
        </View>
      </TouchableNativeFeedback>
    ));
  }
  render() {
    return (
      <View>
        <Header centerComponent={{ text: "Online Users", style: { color: "#fff" } }} />
        {this.renderContacts()}
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
)(ContactScreen);
