
import { Constants } from 'expo';

YOUR_SERVER_URL = 'https://ergoscan.appspot.com/analyzejson'

export async function UploadAnswersAsync(answers, question, question_meta_num = 0, temp = true) {
    console.log("----uploadJSON---")

    let response = await fetch(YOUR_SERVER_URL + '/' + Constants.sessionId.replace('-', ''), {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "sessionId": Constants.sessionId,
            'answers': answers,
            'questions': question,
            'source': 'app',
            'temp': temp,
            question_meta_num: question_meta_num.toString()
        }),
    });

    const json_response = await response.json()
    console.log("---cloud reaction---")
    console.log(json_response)
    console.log("--end cloud---")


}