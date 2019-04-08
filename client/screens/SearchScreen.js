import React, { Component } from "react";
import { View, Text, TouchableNativeFeedback } from "react-native";

import { connect } from "react-redux";
import { Header, ListItem, Input, Icon, Avatar } from "react-native-elements";
import { Transition } from "react-navigation-fluid-transitions";

import { searchUsers } from "../actions/contactActions";
import { ScrollView } from "react-native-gesture-handler";

class SearchScreen extends Component {
  state = { searchValue: "" };

  componentWillMount() {}

  onSearchChange = searchValue => {
    this.props.searchUsers(searchValue);
  };

  renderResults() {
    if (!this.props.results) return <Text> Enter a username above to search</Text>;

    return this.props.results
      .filter(user => user.username !== this.props.username)
      .map(user => {
        console.log(user);
        return (
          <TouchableNativeFeedback
            background={TouchableNativeFeedback.SelectableBackground()}
            onPress={() => this.props.navigation.navigate("chat", { contact: user.username })}
            key={user._id}
          >
            <View>
              <ListItem
                leftAvatar={{
                  title: user.username[0],
                  source: { uri: `https://api.adorable.io/avatars/285/${user.username}` },
                  showEditButton: true,
                  editButton: {
                    name: "globe",
                    type: "font-awesome",
                    color: user.online ? "#00E500" : "#F00",
                    underlayColor: "#000",
                  },
                }}
                title={user.username}
                subtitle={"Tap to message"}
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
          this.props.navigation.navigate("contacts");
        }}
      >
        <View style={{ padding: 15 }}>
          <Icon name="chevron-left" type="font-awesome" color="white" />
        </View>
      </TouchableNativeFeedback>
    );

    return (
      <View>
        <Header leftComponent={leftComponent} centerComponent={{ text: "Search Users", style: { color: "#fff" } }} />

        <View>
          <Input
            placeholder="Search for a username"
            value={this.state.inputMessage}
            onChangeText={searchValue => this.onSearchChange(searchValue)}
            multiline
          />
        </View>

        <ScrollView>{this.renderResults()}</ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  results: state.contacts.searchResults,
  username: state.auth.username,
  chat: state.chat,
});

const mapDispatchToProps = { searchUsers };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchScreen);
