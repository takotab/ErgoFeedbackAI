
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View, Text,
  // Button,
  StatusBar,
  FileSystem,
  Image,
  Platform,
  TouchableHighlight
} from 'react-native';
import {
  ExpoLinksView,
  Permissions,
  ImagePicker,
  Constants
} from 'expo';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

import { UploadPhotoAsync } from '../components/uploadFile'
import { w } from '../components/Dimensions'

export default class PhotoScreen extends React.Component {
  static navigationOptions = {
    headerTitleStyle: { alignSelf: 'center', fontSize: 20 },
    headerTitle: "Maak een foto       ",
  };
  state = {
    hasPhotos: false,
    uri: '',
    wait: false,
  };

  _onPictureSaved = async photo => {
    console.log(photo.cancelled)
    if (photo.cancelled) {
      console.log(photo.cancelled + ' photo cancelled')
      return
    }
    console.log('Picture made and saved' + photo.uri)
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
    this.setState({ wait: true });

    response = await UploadPhotoAsync(this.state.uri)
    json_response = await response.json()
    console.log('cloud reaction:')
    console.log(json_response)
    this.props.navigation.navigate('Questions')

  };
  _restore = () => {
    this.setState({ hasPhotos: false, uri: '' });

  }
  renderbutton = () => {
    if (this.state.wait) {
      return <Button
        style={styles.button}
        onPress={this._goNext}
        key='ja'
        title='Ja!'
        loading
      />
    }
    else {
      return <Button
        style={styles.button}
        onPress={this._goNext}
        key='ja'
        title='Ja!'
      />

    }
  }
  render() {
    if (!this.state.hasPhotos) {
      return (
        <View style={styles.container} >
          <StatusBar
            backgroundColor="black"
            barStyle="dark-content"
          />
          <View style={{
            padding: 25,
            backgroundColor: 'white',
            margin: 5,
          }}>
          </View>
          <View style={styles.text}>
            <Text>Vraag iemand om een foto van hoe je achter je computer zit.</Text>
            <Text>Zorg dat de enkel, knie, heup, en schouder zichtbaar zijn.</Text>
          </View>

          <View style={styles.buttons}><View>
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
    }
    else {
      console.log(this.state.uri)
      return (
        <View>
          <View style={{
            padding: 25,
            backgroundColor: 'white',
            margin: 5,
          }}>
          </View>
          <View style={{
            justifyContent: 'center'
          }}>
            <Text style={styles.text}>Is de juiste foto?</Text>
            < Image
              style={{
                width: 200,
                height: 150,
                resizeMode: 'contain',
                margin: 15,
              }}
              source={{
                uri:
                  this.state.uri,
              }}
            />
            {this.renderbutton()}
            <View style={{
              padding: 10,
              backgroundColor: 'white',
              margin: 5,
            }}>
            </View>
            <Button
              key='nope'
              style={styles.button}
              onPress={this._restore}
              title='nope'
            />
          </View>

        </View >
      )
    }

  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  buttons: {
    flex: .25,
    flexDirection: 'column',
    justifyContent: 'space-around',
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
    padding: 6,
    // borderTopColor: '#007AFF',
    // borderTopWidth: 1,
  }
});
