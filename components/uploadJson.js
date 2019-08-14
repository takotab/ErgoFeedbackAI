import Constants from "expo-constants";
import { api } from "../components/url";

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
function makerand(length, addition = "") {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghjklmnopqrstuvwxyz0123456789" + addition;
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export async function UploadLoginCode(code) {
  crypt = require("../assets/crypt.json");
  let r = "";
  for (var i = 0; i < code.length; i++) {
    r += crypt[code.charAt(i)];
  }
  let total_code = makerand(25) + r;
  return UploadDctAsync({ logincode: total_code }, "logincode");
}

export async function UploadDone() {
  return UploadDctAsync({ done: "true" }, "make_rapport");
}

export async function UploadDctAsync(dict, url, addition = "") {
  console.log("----uploadJSON---");

  let sessionid = Constants.sessionId.replace(/-/g, "_");
  dict.sessionId = sessionid;
  let full_url = api + "/" + url + "/" + sessionid + addition;
  console.log("url:" + full_url);
  let response = await fetch(full_url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dict),
  });

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
