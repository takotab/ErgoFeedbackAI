import { Constants } from 'expo';
ANALYSE = 'https://ergoscan.appspot.com/analyze'

export async function UploadPhotoAsync(localUri) {

    // // ImagePicker saves the taken photo to disk and returns a local URI to it
    // let localUri = result.uri;
    let filename = localUri.split('/').pop();


    // Infer the type of the image
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;

    // todo : reduce size https://forums.expo.io/t/get-image-size-in-bytes/3541
    // Upload the image using the fetch and FormData APIs
    let formData = new FormData();
    // Assume "photo" is the name of the form field the server expects
    formData.append('file', { uri: localUri, name: filename, type });
    formData.append('source', 'app')
    formData.append("sessionId", Constants.sessionId)

    return await fetch(ANALYSE, {
        method: 'POST',
        body: formData,
        header: {
            'content-type': 'multipart/form-data',
        },
    });
}