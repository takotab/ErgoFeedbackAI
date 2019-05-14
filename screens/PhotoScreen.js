import React from 'react';
import {
  Button,
  ScrollView,
  StyleSheet,
  View, Text,
  StatusBar,
  FileSystem,
  Image,
  Platform
} from 'react-native';
import {
  ExpoLinksView,
  Permissions,
  ImagePicker
} from 'expo';

import { UploadPhotoAsync } from '../components/uploadFile'

export default class PhotoScreen extends React.Component {
  static navigationOptions = {
    headerTitleStyle: { alignSelf: 'center', fontSize: 20 },
    headerTitle: "Maak een foto       ",
  };
  state = {
    hasPhotos: false,
    uri: '',
  };

  _onPictureSaved = async photo => {
    console.log(photo.cancelled)
    if (photo.cancelled) {
      console.log(photo.cancelled + ' photo cancelled')
      return
    }
    console.log('Picture made and saved' + photo.uri)
    // response = await UploadPhotoAsync(photo.uri)
    // json_response = await response.json()
    // console.log('cloud reaction:' + json_response)
    this.setState({ hasPhotos: true, uri: photo.uri });
  }
  _askPermission = async (type, failureMessage) => {
    const { status, permissions } = await Permissions.askAsync(type);

    if (status === 'denied') {
      alert(failureMessage);
    }
  };

  _takePhoto = async () => {
    await this._askPermission(Permissions.CAMERA, 'We need the camera permission to take a picture...');
    await this._askPermission(Permissions.CAMERA_ROLL, 'We need the camera-roll permission to read pictures from your phone...');
    let pickerResult = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    this._onPictureSaved(pickerResult);
  };

  _pickPhoto = async () => {
    // await this._askPermission(Permissions.CAMERA, 'We need the camera permission to take a picture...');
    await this._askPermission(Permissions.CAMERA_ROLL, 'We need the camera-roll permission to read pictures from your phone...');
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    }); '  '
    this._onPictureSaved(pickerResult);
  };

  _goNext = async () => {
    await console.log('goNext');
    navigate('Meta')

  };

  render() {
    if (!this.state.hasPhotos) {
      return (
        <View style={styles.container} >
          <StatusBar
            backgroundColor="black"
            barStyle="dark-content"
          />
          <View style={styles.buttons}>
            <View>
              <Button
                style={styles.button}
                onPress={this._takePhoto}
                title="Take a photo"
              />
            </View>
            <View>
              <Button
                style={styles.button}
                onPress={this._pickPhoto}
                title="Pick Photo"
              // accessibilityLabel="Learn more about this purple button"
              />
            </View>
          </View>
        </View>
      );
    }
    else {
      console.log(this.state.uri)
      return <View style={styles.container}>
        <Text>IS this the photo you want?</Text>

        < Image
          style={{
            width: 200,
            height: 150,
            resizeMode: 'contain',
            marginVertical: 8,
          }}
          source={{
            uri:
              this.state.uri,
          }}
        />
        <Button
          onPress={this._goNext}
          title='Ja!'
        />
        <Button
          onPress={this._restore}//TODO: --
          title='nope'
        />
      </View>

    }

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  buttons: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    // alignItems: 'center',
    // fontSize: 18,
    // height: 44,
  },
  button: {
    // padding: 25,
    margin: 50,
  }
});
