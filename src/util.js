export async function request(path, body) {
  const url = process.env.REACT_APP_API_BASE_URL
    ? process.env.REACT_APP_API_BASE_URL + path
    : path;
  const method = body ? "POST" : "GET";
  const headers = new Headers({
    "Content-type": "application/json"
  });

  const token = localStorage.getItem("token");
  if (token) {
    headers.append("Authorization", "Bearer " + localStorage.getItem("token"));
  }

  const optons = {
    method,
    headers,
    body: JSON.stringify(body)
  };

  const res = await fetch(url, optons);
  const data = await res.json();
  return { data, ok: res.ok, status: res.status };
}
