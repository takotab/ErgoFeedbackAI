import React from "react";
import { View, Text } from "react-native";

export class Head extends React.Component {
  render() {
    let padding = this.props.pad;
    if (padding === undefined) {
      padding = 25;
    }
    return (
      <View>
        <Text> </Text>
        <View
          style={{
            padding: padding,
            backgroundColor: "white",
            margin: 5
          }}
        />
        <View
          style={{
            justifyContent: "center"
          }}
        />
      </View>
    );
  }
}
