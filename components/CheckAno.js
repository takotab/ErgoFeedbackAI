import React from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  // Button,
  StatusBar,
  FileSystem,
  Image,
  ImageManipulator,
  FlatList
} from "react-native";
import Constants from "expo-constants";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import { ExpoLinksView } from "expo";

import { Button } from "react-native-elements";

import { UploadDctAsync } from "./uploadJson";
import { w } from "./Dimensions";

export class CheckAno extends React.Component {
  constructor() {
    super();

    this.state = {
      poseimg:
        "https://storage.googleapis.com/ergoscan-img/6271f2bc_00b2_46a9_9590_1fac749cb492/photo-0-6271f2bc_00b2_46a9_9590_1fac749cb492_w_pose_bbox.png"
    };
  }

  _goNext = async () => {
    await console.log("goNext");

    response = await UploadDctAsync(
      {
        ImageCheck: this.props.poseimg,
        humanCheck: "True"
      },
      "to_firebase"
    );
    this.props.goNext();
  };

  _goback = async () => {
    response = await UploadDctAsync(
      {
        ImageCheck: this.props.poseimg,
        humanCheck: "False"
      },
      "to_firebase"
    );
    this.props.restore();
  };

  renderbutton = (name, onpress) => {
    if (this.state.wait) {
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
    console.log("checkanno");
    console.log(this.props);
    console.log(this.props.poseimg);

    return (
      <View>
        <View
          style={{
            padding: 25,
            backgroundColor: "white",
            margin: 5
          }}
        />
        <View
          style={{
            justifyContent: "center"
          }}
        >
          <Text style={styles.text}>Kloppen de anotaties in de foto?</Text>

          <Image
            source={{ uri: this.props.poseimg }}
            style={{ width: 300, height: 400 }}
          />
          <Text style={styles.text}>
            Let aub op de locatie van de volgende markers:
          </Text>
          <View style={{ padding: 25 }}>
            <FlatList
              data={[
                { key: "Oor" },
                { key: "Schouder" },
                { key: "Elleboog" },
                { key: "Pols" },
                { key: "Heup" },
                { key: "Knie" },
                { key: "Enkel" }
              ]}
              renderItem={({ item }) => <Text>- {item.key}</Text>}
            />
          </View>
          <View
            style={{
              // padding: 15,
              backgroundColor: "white",
              margin: 5
            }}
          />
          {this.renderbutton("ja", this._goNext)}
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
            onPress={this._restore}
            title="Nee"
          />
        </View>
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
    // Color: '#00008b',
    // borderTopColor: '#007AFF',
    // borderTopWidth: 1,
  }
});
