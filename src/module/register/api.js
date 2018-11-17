import { request } from "../../util";

export default async function register(user) {
  const { ok, status, data } = await request("/api/auth/register", user);
  if (!ok) throw new Error(data.message);
  return data.message;
}
