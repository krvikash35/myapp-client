import request from "../utils/api";

export default async function login(username, password) {
  const { ok, data } = await request("/api/auth/login", {
    username,
    password
  });
  if (!ok) throw new Error(data.message);
}
