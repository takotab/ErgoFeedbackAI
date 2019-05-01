
import { Constants } from 'expo';

YOUR_SERVER_URL = 'https://ergoscan.appspot.com/analyzejson'

export async function UploadPhotoAsync(answers) {

    return await fetch(YOUR_SERVER_URL, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            sessionId: Constants.sessionId,
            answers: answers,
            'source': 'app'
        }),
    });
}