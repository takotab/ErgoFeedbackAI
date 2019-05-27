import { Constants } from 'expo';
import ImageResizer from 'react-native-image-resizer';

let api = (Constants.appOwnership === "expo") //&& Constants.packagerOpts.dev
    ? 'http://192.168.178.28:8080'
    : `https://ergoscan.appspot.com`;
api = 'https://ergoscan.appspot.com'
INTERNAL_SERVER_URL = 'http://localhost:8080/analyze'
let newWidth = 1080
let newHeight = 1080
let quality = 80

export async function UploadPhotoAsync(localUri) {

    ImageResizer.createResizedImage(localUri, newWidth, newHeight, 'JPEG', quality, 0, null
    ).then((response) => {
        newImage = response.uri;
        // response.uri is the URI of the new image that can now be displayed, uploaded...
        // response.path is the path of the new image
        // response.name is the name of the new image with the extension
        // response.size is the size of the new image
    }).catch((err) => {
        console.log(err);
        return Alert.alert('Unable to resize the photo', 'Check the console for full the error message');
    });
    // // ImagePicker saves the taken photo to disk and returns a local URI to it
    // let localUri = result.uri;
    let filename = newImage.split('/').pop();


    // Infer the type of the image
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;


    // Upload the image using the fetch and FormData APIs
    let formData = new FormData();
    // Assume "photo" is the name of the form field the server expects
    formData.append('file', { uri: newImage, name: filename, type });
    formData.append('source', 'app')
    formData.append("sessionId", Constants.sessionId)

    // if (Constants.appOwnership === 'expo') {
    //     SERVER_URL = OUR_SERVER_URL;
    //     console.log('still debug mode. interal server used.');
    //     formData.append("debug", 'true')
    // }
    // else {
    //     SERVER_URL = OUR_SERVER_URL;
    //     formData.append("debug", 'false')
    //     console.log('real deal server');
    // }
    console.log('uploading to ' + api + '/analyze/' + (Constants.sessionId).replace('-', ''))

    return await fetch((api + '/analyze/' + (Constants.sessionId).replace('-', '')), {
        method: 'POST',
        body: formData,
        header: {
            'content-type': 'multipart/form-data',
        },
    });
}