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
    const t = Math.round(elapsed / 1000);
    if (t <= 1) return "Now";
    return t + " seconds ago";
  } else if (elapsed < msPerHour) {
    const t = Math.round(elapsed / msPerMinute);
    if (t <= 1) return "1 minute ago";
    return t + " Minutes ago";
  } else if (elapsed < msPerDay) {
    const t = Math.round(elapsed / msPerHour);
    if (t <= 1) return "1 hour ago";
    return t + " hours ago";
  } else if (elapsed < msPerMonth) {
    const t = Math.round(elapsed / msPerDay);
    if (t <= 1) return "1 day ago";
    return t + " days ago";
  } else if (elapsed < msPerYear) {
    const t = Math.round(elapsed / msPerMonth);
    if (t <= 1) return "1 month ago";
    return t + " months ago";
  } else {
    return Math.round(elapsed / msPerYear) + " years ago";
  }
}

export function debounce(fn, time = 0.5) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      timeout = null;
      fn(...args);
    }, time * 1000);
  };
}

export function throttle(fn, time = 1) {
  let wait = false;
  return (...args) => {
    if (!wait) {
      wait = true;
      fn(...args);
      setTimeout(() => {
        wait = false;
      }, time * 1000);
    }
  };
}
