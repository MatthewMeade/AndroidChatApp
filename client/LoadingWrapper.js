import React, { Component } from "react";
import { View } from "react-native";

import { connect } from "react-redux";

import { ActivityIndicator } from "react-native";

class LoadingComponent extends Component {
  render() {
    if (this.props.isLoading)
      return (
        <View style={{ justifyContent: "center", flex: 1 }}>
          <ActivityIndicator size="large" animating={this.props.isLoading} color="green" />
        </View>
      );
    return this.props.children;
  }
}

const mapLoadingState = state => ({ isLoading: state.loading });

export default connect(mapLoadingState)(LoadingComponent);
