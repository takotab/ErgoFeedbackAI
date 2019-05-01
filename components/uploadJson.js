
import { Constants } from 'expo';

YOUR_SERVER_URL = 'https://ergoscan.appspot.com/analyzejson'

export async function UploadAnswersAsync(answers, question) {
    console.log("----uploadJSON---")

    const { response } = await fetch(YOUR_SERVER_URL, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "sessionId": Constants.sessionId,
            'answers': answers,
            'question': question,
            'source': 'app'
        }),
    });

    const json_response = await response.json()
    console.log("cloud reaction" + json_response)


}