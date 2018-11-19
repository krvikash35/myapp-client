import history from "./history";
import { TOKEN_NAME } from "./constants";

export default async function request(path, body, methodOption) {
  const url = process.env.REACT_APP_API_BASE_URL
    ? process.env.REACT_APP_API_BASE_URL + path
    : path;

  let method = "GET";
  if (methodOption) {
    method = methodOption;
  } else if (body) {
    method = "POST";
  }
  const headers = new Headers({
    "Content-type": "application/json"
  });

  const token = localStorage.getItem("token");
  if (token) {
    headers.append(
      "Authorization",
      "Bearer " + localStorage.getItem(TOKEN_NAME)
    );
  }

  const optons = {
    method,
    headers,
    body: JSON.stringify(body)
  };

  const res = await fetch(url, optons);
  const data = await res.json();
  if (res.status === 401) {
    history.push("/login", { from: history.location });
  }
  if (data.token) {
    localStorage.setItem(TOKEN_NAME, data.token);
  }
  return { data, ok: res.ok, status: res.status };
}

export function getAvatarColor(str, s = 30, l = 80) {
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  var h = hash % 360;
  return "hsl(" + h + ", " + s + "%, " + l + "%)";
}

export function getTimeDifference(date) {
  var msPerMinute = 60 * 1000;
  var msPerHour = msPerMinute * 60;
  var msPerDay = msPerHour * 24;
  var msPerMonth = msPerDay * 30;
  var msPerYear = msPerDay * 365;

  var elapsed = new Date() - date;

  if (elapsed < msPerMinute) {
    return Math.round(elapsed / 1000) + " seconds ago";
  } else if (elapsed < msPerHour) {
    return Math.round(elapsed / msPerMinute) + " minutes ago";
  } else if (elapsed < msPerDay) {
    return Math.round(elapsed / msPerHour) + " hours ago";
  } else if (elapsed < msPerMonth) {
    return Math.round(elapsed / msPerDay) + " days ago";
  } else if (elapsed < msPerYear) {
    return Math.round(elapsed / msPerMonth) + " months ago";
  } else {
    return Math.round(elapsed / msPerYear) + " years ago";
  }
}
