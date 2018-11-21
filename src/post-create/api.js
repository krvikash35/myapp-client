import request from "../utils/api";

export default async function createPost(title, content) {
  const { ok, data } = await request("/api/posts", { title, content });
  if (!ok) throw new Error(data.message);
  return data;
}
