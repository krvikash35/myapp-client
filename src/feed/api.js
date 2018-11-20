import request from "../utils/api";
import { POST_SIZE_PER_FETCH } from "./constants";

export default async function getPosts(page = 1) {
  const { ok, data } = await request(
    `/api/posts?page=${page}&size=${POST_SIZE_PER_FETCH}`
  );
  if (!ok) throw new Error(data.message);
  return data;
}
