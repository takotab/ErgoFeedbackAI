import React from "react";
import { View, Image, StyleSheet, Text } from "react-native";
import { Button } from "react-native-elements";
import { Head } from "./Head";
import { w } from "./Dimensions";

export class CheckPhoto extends React.Component {
  renderbutton = (name, onpress) => {
    if (this.props.wait) {
      return (
        <Button
          style={styles.button}
          // onPress={this._goNext}
          key={name}
          title={name}
          loading
        />
      );
    } else {
      return (
        <Button
          style={styles.button}
          onPress={onpress}
          key={name}
          title={name}
        />
      );
    }
  };
  render() {
    return (
      <View>
        <Head pad={5} />
        <Text style={styles.text}>{this.props.text}</Text>
        <Image
          style={{
            width: 300,
            height: 400,
            resizeMode: "contain",
            margin: 15
          }}
          source={{
            uri: this.props.uri
          }}
        />
        {this.renderbutton("ja", this.props.ja)}
        <View
          style={{
            padding: 10,
            backgroundColor: "white",
            margin: 5
          }}
        />
        <Button
          key="nope"
          style={styles.button}
          onPress={this.props.nee}
          title="Nee"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column"
  },
  buttons: {
    flex: 0.25,
    flexDirection: "column",
    justifyContent: "space-around"
    // alignItems: 'center',
    // fontSize: 18,
    // height: 44,
  },
  button: {
    // padding: 25,
    margin: 100,
    padding: 5,
    width: w(75)
  },
  text: {
    fontSize: 14,
    padding: 6
    // borderTopColor: '#007AFF',
    // borderTopWidth: 1,
  }
});
