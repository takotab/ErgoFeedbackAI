import Constants from "expo-constants";

YOUR_SERVER_URL = "https://ergoscan.appspot.com";

export async function UploadAnswersAsync(
  answers,
  question,
  keys,
  question_meta_num = 0,
  temp = true,
  done = "false",
) {
  return UploadDctAsync(
    {
      answers: answers,
      // questions: question,
      keys: keys,
      source: "app",
      temp: temp,
      done: done,
      question_meta_num: question_meta_num.toString(),
    },
    "answers",
    "/" + question_meta_num.toString(),
  );
}

export async function UploadDone() {
  return UploadDctAsync({ done: "true" }, "make_rapport");
}

export async function UploadDctAsync(dict, url, addition = "") {
  console.log("----uploadJSON---");

  let sessionid = Constants.sessionId.replace(/-/g, "_");
  dict.sessionId = sessionid;
  let response = await fetch(
    YOUR_SERVER_URL + "/" + url + "/" + sessionid + addition,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dict),
    },
  );

  console.log("---cloud reaction---");
  console.log("status:" + response.status.toString());
  if (response.status == 500) {
    return { result: "fail", status: 500 };
  }
  const json_response = await response.json();
  console.log(json_response);
  console.log("--end cloud---");
  return json_response;
}
