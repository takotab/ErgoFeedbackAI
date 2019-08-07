import React from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  Button,
  StatusBar,
  FileSystem,
  Image,
  Platform,
  TouchableHighlight,
  Linking,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { UploadDone } from "../components/uploadJson";

export default class EndScreen extends React.Component {
  renderHeader = () => {};
  state = {
    send: false,
    response: "",
  };

  // _return() {
  //   console.log("Go back");
  //   console.log(this.props);
  //   this.props.navigation.navigate("Photo");
  // }

  // homeButton() {
  //   return (
  //     <View>
  //       <Ionicons
  //         name="md-home"
  //         size={32}
  //         // color="green"
  //         onPress={this._return}
  //       />
  //     </View>
  //   );
  // }
  _response() {
    if (this.state.send) {
      if (this.state.response === "fail") {
        return (
          <View>
            <Text style={styles.text}>
              Er is iets mis gegaan. U krijgt binnen 24 uur een reactie.{" "}
            </Text>
            {/* {this.homeButton()} */}
          </View>
        );
      }
      if (this.state.response === "succes") {
        // Todo show link
        return (
          <View>
            <Text style={styles.text}>
              U heeft een mailtje gekregen met uw rapport.
            </Text>
            {/* {this.homeButton()} */}
          </View>
        );
        //     < Text style={styles.text} onPress={() => Linking.openURL('https://google.com')} >
        //         Kli
        // </ Text >
      }
    } else {
      return (
        <View>
          <Text style={styles.text}>Je krijgt een email met het rapport.</Text>
          <Text style={styles.text}>Het kan even duren. </Text>
        </View>
      );
    }
    console.log("somthing went wrong in _response");
    console.log(this.state);
  }
  _check_response = async () => {
    if (this.state.send == false) {
      r = await UploadDone();
      console.log("response to done");
      console.log(r);
      this.setState({
        send: true,
        response: r.result,
      });
      console.log("Everything uploaded");
      console.log(r.result === "fail");
    }
  };
  render() {
    this._check_response();
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="black" barStyle="dark-content" />
        <View
          style={{
            padding: 25,
            backgroundColor: "white",
            margin: 5,
          }}
        />
        {this._response()}
        {/* <Text style={styles.text}>
                Mocht u na 5 minuten geen bericht hebben.
            </Text> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  buttons: {
    flex: 0.25,
    flexDirection: "column",
    justifyContent: "space-around",
    // alignItems: 'center',
    // fontSize: 18,
    // height: 44,
  },
  button: {
    // padding: 25,
    margin: 100,
    padding: 5,
    // width: w(75)
  },
  text: {
    fontSize: 14,
    padding: 6,
    color: "rgba(96,100,109, 0.8)",
    fontSize: 20,
    // borderTopColor: '#007AFF',
    // borderTopWidth: 1,
  },
});
