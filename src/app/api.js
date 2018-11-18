import request from "../utils/api";

export default async function getCurrentUser() {
  const { ok, data } = await request("/api/users/me");
  if (!ok) throw new Error(data.message);
  return data;
}
