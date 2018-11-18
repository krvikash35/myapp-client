import request from "../utils/api";

export default async function getPosts() {
  const { ok, data } = await request("/api/posts?page=1&size=10");
  if (!ok) throw new Error(data.message);
  return data;
}
