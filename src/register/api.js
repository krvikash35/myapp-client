import request from "../utils/api";

export default async function register(user) {
  const { ok, data } = await request("/api/auth/register", user);
  if (!ok) throw new Error(data.message);
  return data.message;
}
