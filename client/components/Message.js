import React from "react";
import { View, Text } from "react-native";
import { Avatar } from "react-native-elements";

const Message = ({ from, text, isOutgoing }) => {
  const styles = isOutgoing ? bothStyles.outgoingStyles : bothStyles.incomingStyles;

  const avatar = (
    <View style={styles.avatarStyle}>
      <Avatar rounded source={{ uri: `https://api.adorable.io/avatars/285/${from}` }} />
    </View>
  );
  return (
    <View style={styles.containerStyle}>
      {!isOutgoing && avatar}
      <View style={styles.bodyStyle}>
        <Text style={styles.textStyle}>{text}</Text>
      </View>
      {isOutgoing && avatar}
    </View>
  );
};

// TODO: Rename
const bothStyles = {
  incomingStyles: {
    containerStyle: {
      flexDirection: "row",
      marginTop: 25,
      paddingLeft: 5,
    },

    bodyStyle: {
      backgroundColor: "#2089dc",
      padding: 5,
      flex: 1,
      marginLeft: 5,
      marginRight: 50,
      borderRadius: 5,
    },

    textStyle: {
      color: "white",
    },
  },

  outgoingStyles: {
    containerStyle: {
      flexDirection: "row",
      marginTop: 25,
      paddingRight: 5,
    },

    bodyStyle: {
      backgroundColor: "#EEE",
      padding: 5,
      flex: 1,
      marginRight: 5,
      marginLeft: 50,
      borderRadius: 5,
      order: 1,
    },

    textStyle: {
      color: "black",
      textAlign: "right",
    },
  },
};

export default Message;
