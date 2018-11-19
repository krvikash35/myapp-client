import request from "../utils/api";

export default async function getPosts(page = 1) {
  const { ok, data } = await request(`/api/posts?page=${page}&size=5`);
  if (!ok) throw new Error(data.message);
  return data;
}
