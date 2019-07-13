import Constants from "expo-constants";

YOUR_SERVER_URL = "https://ergoscan.appspot.com";

export async function UploadAnswersAsync(
  answers,
  question,
  question_meta_num = 0,
  temp = true,
  done = "false"
) {
  return UploadDctAsync(
    {
      // "sessionId": sessionid,
      answers: answers,
      questions: question,
      source: "app",
      temp: temp,
      done: done,
      question_meta_num: question_meta_num.toString()
    },
    "analyzejson"
  );
}

export async function UploadDctAsync(dict, url) {
  console.log("----uploadJSON---");

  let sessionid = Constants.sessionId.replace(/-/g, "_");
  dict.sessionId = sessionid;
  let response = await fetch(YOUR_SERVER_URL + "/" + url + "/" + sessionid, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(dict)
  });

  const json_response = await response.json();
  console.log("---cloud reaction---");
  console.log(json_response);
  console.log("--end cloud---");
  return json_response;
}
