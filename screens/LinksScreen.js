import React from 'react';
import { Button, ScrollView, StyleSheet, View, Text, FileSystem, Image } from 'react-native';
import { ExpoLinksView, Permissions, ImagePicker } from 'expo';

import { UploadPhotoAsync } from '../uploadFile'

export default class LinksScreen extends React.Component {
  state = {
    hasPhotos: false,
    uri: '',
  };
  static navigationOptions = {
    title: 'Links',
  };
  _onPictureSaved = async photo => {
    console.log('Picture made and saved' + photo.uri)
    response = await UploadPhotoAsync(photo.uri)
    json_response = await response.json()
    console.log('cloud reaction:' + json_response)
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
    });

    this._onPictureSaved(pickerResult);
  };

  render() {
    if (!this.state.hasPhotos) {
      return (
        <ScrollView style={styles.container}>
          <View><Text>Test</Text></View>
          <View style={{ marginVertical: 8 }}>
            <Button
              onPress={this._takePhoto}
              title="Take a photo"
            />
          </View>
          <View>
            <Button
              onPress={this._pickPhoto}
              title="Pick Photo"
            />
          </View>
        </ScrollView>
      );
    }
    else {
      console.log(this.state.uri)
      return <View>
        <Text>IS this the photo you want?</Text>
        {/* <Image
          style={{ width: 50, height: 50 }}
          source={{ uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png' }}
        /> */}
        < Image
          style={{
            width: 80,
            height: 80,
            resizeMode: 'contain',
          }}
          source={{
            uri:
              this.state.uri,
          }}
        />
      </View>
    }

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
