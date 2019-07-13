
import Constants from 'expo-constants'
import ImageResizer from 'react-native-image-resizer';

let api = (Constants.appOwnership === "expo") //&& Constants.packagerOpts.dev
    ? 'http://192.168.178.28:8080'
    : `https://ergoscan.appspot.com`;
api = 'https://ergoscan.appspot.com'
INTERNAL_SERVER_URL = 'http://localhost:8080/analyze'

export async function UploadPhotoAsync(localUri) {

    // // ImagePicker saves the taken photo to disk and returns a local URI to it
    // let localUri = result.uri;
    let filename = localUri.split('/').pop();


    // Infer the type of the image
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;

    let sessionid = Constants.sessionId.replace(/-/g, '_');

    // Upload the image using the fetch and FormData APIs
    let formData = new FormData();
    // Assume "photo" is the name of the form field the server expects
    formData.append('file', { uri: localUri, name: filename, type });
    formData.append('source', 'app')
    formData.append("sessionId", sessionid)

    console.log('uploading to ' + api + '/analyze/' + sessionid)

    return await fetch((api + '/analyze/' + sessionid), {
        method: 'POST',
        body: formData,
        header: {
            'content-type': 'multipart/form-data',
        },
    });
}