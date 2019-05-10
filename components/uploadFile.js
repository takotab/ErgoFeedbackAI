import { Constants } from 'expo';
OUR_SERVER_URL = 'https://ergoscan.appspot.com/analyze'

export async function UploadPhotoAsync(localUri) {

    // // ImagePicker saves the taken photo to disk and returns a local URI to it
    // let localUri = result.uri;
    let filename = localUri.split('/').pop();


    // Infer the type of the image
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;


    // Upload the image using the fetch and FormData APIs
    let formData = new FormData();
    // Assume "photo" is the name of the form field the server expects
    formData.append('file', { uri: localUri, name: filename, type });
    formData.append('source', 'app')
    formData.append("sessionId", Constants.sessionId)
    
    return await fetch(YOUR_SERVER_URL, {
        method: 'POST',
        body: formData,
        header: {
            'content-type': 'multipart/form-data',
        },
    });
}