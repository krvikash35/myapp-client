import request from "../utils/api";

export default function getPosts() {
  const { ok, data } = request("/api/posts?page=1&size=10");
  if (!ok) throw new Error(data.message);
  return data;
}
