import Constants from 'expo-constants'

YOUR_SERVER_URL = 'https://ergoscan.appspot.com/analyzejson'

export async function UploadAnswersAsync(answers, question, question_meta_num = 0, temp = true, done = 'false') {
    console.log("----uploadJSON---")

    let sessionid = Constants.sessionId.replace(/-/g, '_');
    let response = await fetch(YOUR_SERVER_URL + '/' + sessionid, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "sessionId": sessionid,
            'answers': answers,
            'questions': question,
            'source': 'app',
            'temp': temp,
            'done': done,
            question_meta_num: question_meta_num.toString()

        }),
    });

    const json_response = await response.json()
    console.log("---cloud reaction---")
    console.log(json_response)
    console.log("--end cloud---")
    return json_response

}