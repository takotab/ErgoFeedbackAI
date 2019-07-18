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
  TouchableHighlight
} from "react-native";
import Constants from "expo-constants";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import { ExpoLinksView } from "expo";

import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { CheckAno } from "../components/CheckAno";

import { UploadPhotoAsync } from "../components/uploadFile";
import { w } from "../components/Dimensions";

defaultState = {
  hasPhotos: true, // TODO change
  uri: "",
  wait: false,
  answer: null,
  photoannotated: true, // TODO change

  poseimg:
    "https://storage.googleapis.com/ergoscan-img/6271f2bc_00b2_46a9_9590_1fac749cb492/photo-0-6271f2bc_00b2_46a9_9590_1fac749cb492_w_pose_bbox.png"
};

export default class PhotoScreen extends React.Component {
  static navigationOptions = {
    headerTitleStyle: { alignSelf: "center", fontSize: 20 },
    headerTitle: "Maak een foto       "
  };
  state = Object.assign({}, defaultState);
  // _changeSizePicture = async (uri) => {
  //     console.log(uri)
  //     const photo = await ImageManipulator.manipulateAsync(
  //         uri,
  //         [{ resize: 1080 }],
  //         { format: 'png', compress: 0.75 }
  //     );
  //     console.log(photo)
  //     return photo
  // }

  _onPictureSaved = async photo => {
    console.log(photo.cancelled);
    if (photo.cancelled) {
      console.log(photo.cancelled + " photo cancelled");
      return;
    }
    console.log("Picture made and saved" + photo.uri);
    this.setState({ hasPhotos: true, uri: photo.uri });
  };

  _askPermission = async (type, failureMessage) => {
    const { status, permissions } = await Permissions.askAsync(type);

    if (status === "denied") {
      alert(failureMessage);
    }
  };

  _takePhoto = async () => {
    await this._askPermission(
      Permissions.CAMERA,
      "We need the camera permission to take a picture..."
    );
    await this._askPermission(
      Permissions.CAMERA_ROLL,
      "We need the camera-roll permission to read pictures from your phone..."
    );
    let pickerResult = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 0.1
      // aspect: [4, 3],
    });

    this._onPictureSaved(pickerResult);
  };

  _pickPhoto = async () => {
    // await this._askPermission(Permissions.CAMERA, 'We need the camera permission to take a picture...');
    await this._askPermission(
      Permissions.CAMERA_ROLL,
      "We need the camera-roll permission to read pictures from your phone..."
    );
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      // aspect: [1024, 1024],
      quality: 0.1
    });
    console.log(pickerResult);
    this._onPictureSaved(pickerResult);
  };
  _uploadPhoto = async () => {
    await console.log("uploadPhoto");
    this.setState({ wait: true });

    response = await UploadPhotoAsync(this.state.uri);
    json_response = await response.json();
    console.log("cloud reaction:");
    console.log(json_response);
    this.state.img_pose = json_response.img_pose;
  };

  _goNext = async () => {
    this.props.navigation.navigate(
      "Questions"
      // {
      //   poseimg:
      //     "https://storage.googleapis.com/ergoscan-img/6271f2bc_00b2_46a9_9590_1fac749cb492/photo-0-6271f2bc_00b2_46a9_9590_1fac749cb492_w_pose_bbox.png"
      // }
    );
  };
  _restore = () => {
    this.setState(() => {
      let dstate = { ...defaultState };
      return dstate;
    });

    this.setState({
      hasPhotos: false,
      uri: "",
      wait: false,
      photoannotated: false
    });
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
  onSelect = async (key, answer) => {
    console.log("selected " + answer + " for " + key);
    this.setState({
      answer: answer
    });
  };
  render() {
    console.log("renderphotoscreen");
    console.log(this.state);
    if (!this.state.hasPhotos) {
      return (
        <View style={styles.container}>
          <StatusBar backgroundColor="black" barStyle="dark-content" />
          <View
            style={{
              padding: 25,
              backgroundColor: "white",
              margin: 5
            }}
          />
          <View style={styles.text}>
            <Text>
              Vraag iemand om een foto van hoe je achter je computer zit.
            </Text>
            <Text>
              Zorg dat de enkel, knie, heup, schouder, en oor zichtbaar zijn.
            </Text>
          </View>

          <View style={styles.buttons}>
            <View>
              <Button
                style={styles.button}
                onPress={this._takePhoto}
                title="Maak een foto"
              />
            </View>
            <View>
              <Button
                style={styles.button}
                onPress={this._pickPhoto}
                title="Kies een foto uit je galerij"
                // accessibilityLabel="Learn more about this purple button"
              />
            </View>
          </View>
        </View>
      );
    } else if (!this.state.photoannotated) {
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
            <Text style={styles.text}>Is de juiste foto?</Text>
            <Image
              style={{
                width: 200,
                height: 150,
                resizeMode: "contain",
                margin: 15
              }}
              source={{
                uri: this.state.uri
              }}
            />
            {this.renderbutton("ja", this._uploadPhoto)}
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
    } else if (this.state.photoannotated) {
      return (
        <CheckAno
          poseimg={this.state.poseimg}
          restore={this._restore}
          goNext={this._goNext}
        />
      );
    }
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
