import React from "react";
import { Image, StyleSheet, View, Text, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";

import { Button } from "react-native-elements";
import { CheckAno } from "../components/CheckAno";
import { Ionicons } from "@expo/vector-icons";
import { Head } from "../components/Head";
import { CheckPhoto } from "../components/CheckPhoto";

import { UploadDctAsync } from "../components/uploadJson";
import { UploadPhotoAsync } from "../components/uploadFile";
import { w } from "../components/Dimensions";

let quality = 0.8;
let version = "19-09-2019";
let defaultState = {
  hasPhotos: false,
  uri: "",
  wait: false,
  answer: null,
  photoannotated: false,
  poseimg: "",
  incl_human: false,
  _switch: "pic_photo",
  // "https://storage.googleapis.com/ergoscan-img/6271f2bc_00b2_46a9_9590_1fac749cb492/photo-0-6271f2bc_00b2_46a9_9590_1fac749cb492_w_pose_bbox.png"
};

export default class PhotoScreen extends React.Component {
  static navigationOptions = {
    headerTitleStyle: { alignSelf: "center", fontSize: 20 },
    headerTitle: "Maak een foto       ",
  };
  state = Object.assign({}, defaultState);

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
      "We need the camera permission to take a picture...",
    );
    await this._askPermission(
      Permissions.CAMERA_ROLL,
      "We need the camera-roll permission to read pictures from your phone...",
    );
    let pickerResult = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: quality,
      // aspect: [4, 3],
    });

    this._onPictureSaved(pickerResult);
  };

  _pickPhoto = async () => {
    // await this._askPermission(Permissions.CAMERA, 'We need the camera permission to take a picture...');
    await this._askPermission(
      Permissions.CAMERA_ROLL,
      "We need the camera-roll permission to read pictures from your phone...",
    );
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      // aspect: [1024, 1024],
      quality: quality,
    });
    console.log(pickerResult);
    this._onPictureSaved(pickerResult);
  };
  _uploadPhoto = async () => {
    await console.log("_uploadPhoto");
    this.setState({ wait: true });
    response = await UploadPhotoAsync(this.state.uri);
    await response
      .json()
      .then(json_response => {
        console.log("cloud reaction:");
        console.log(json_response);
        if (json_response.angles.redo_pic === "true") {
          this.setState({
            poseimg: json_response.pic_url,
            hasPhotos: false,
            _switch: "pic_photo",
            wait: false,
          });
          Alert.alert(
            "Uw onderbeen staat niet recht.",
            "Maakt u alstublieft een nieuwe foto waarbij deze wel recht staat.",
          );
          this._restore();
        } else if (json_response.angles.incl_human === "true") {
          console.log(json_response.angles.pose_img);
          this.setState({
            poseimg: json_response.angles.pose_img,
            _switch: "annotated",
            wait: false,
          });
        } else {
          this.setState({
            poseimg: json_response.pic_url,
            _switch: "no_human",
            wait: false,
          });
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  _goNext = async () => {
    this.props.navigation.navigate("login");
  };

  _restore = () => {
    this.setState(() => {
      let dstate = { ...defaultState };
      return dstate;
    });
    console.log("default restored");
  };

  render() {
    console.log("render photoscreen");
    console.log(this.state);
    if (!this.state.hasPhotos) {
      return (
        <View style={styles.row_container}>
          <View style={{ flex: 0.5 }}>
            <Image
              style={{ width: 400, resizeMode: "contain" }}
              source={require("../assets/images/example_pic.jpg")}
            />
          </View>
          <View>
            <View style={styles.container}>
              <View style={styles.text}>
                <Text>
                  Vraag iemand om een foto van hoe je achter je computer zit.
                  Houd uw handen op het toetsenboard.
                </Text>
                <Text>
                  Zorg dat de enkel, knie, heup, schouder, en oor zichtbaar
                  zijn.
                </Text>
                <Text>
                  Doe het scherm van uw computer uit. En probeer rechte foto te
                  maken, met camera ter hoogte van het bureaublad.
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
              <View style={{ position: "absolute", bottom: 3, right: 10 }}>
                <Ionicons
                  name="md-information-circle-outline"
                  size={32}
                  onPress={() => {
                    Alert.alert("Version", version);
                  }}
                />
              </View>
            </View>
          </View>
        </View>
      );
    } else if (this.state.hasPhotos && this.state._switch === "pic_photo") {
      return (
        <View>
          <Head pad={5} />
          <CheckPhoto
            text="Is dit de juiste foto?"
            uri={this.state.uri}
            ja={this._uploadPhoto}
            nee={this._restore}
            wait={this.state.wait}
          />
        </View>
      );
    } else if (this.state.hasPhotos && this.state._switch === "no_human") {
      return (
        <View>
          <Head pad={5} />
          <CheckPhoto
            text="Klopt het dat er geen persoon in de foto te vinden is?"
            uri={this.state.uri}
            ja={() => {
              this.setState({ wait: true });
              UploadDctAsync(
                {
                  ImageCheck: this.state.poseimg,
                  incl_human: "false",
                },
                "to_firebase",
              );
              this._restore();
            }}
            nee={() => {
              this.setState({ wait: true });
              UploadDctAsync(
                {
                  ImageCheck: this.state.poseimg,
                  incl_human: "true",
                },
                "to_firebase",
              );
              Alert.alert(
                "Exuses",
                "Het huidige programma kan u niet in de foto vinden. " +
                  "Kunt alstublieft een nieuwe foto maken. Mogelijk iets verder uitgezoomd.",
              );
              this._restore();
            }}
            wait={this.state.wait}
          />
        </View>
      );
    } else if (this.state._switch === "annotated") {
      return (
        <CheckPhoto
          text="Kloppen de anotaties in de foto?"
          uri={this.state.poseimg}
          nee={this._restore}
          ja={this._goNext}
        />
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  row_container: {
    flex: 1,
    flexDirection: "row",
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
    width: w(75),
  },
  text: {
    fontSize: 18,
    padding: 6,
    // borderTopColor: '#007AFF',
    // borderTopWidth: 1,
  },
});
