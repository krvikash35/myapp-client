import request from "../../utils/api";

export async function likePost(postid) {
  const { ok, data } = await request(
    "/api/posts",
    {
      optype: "likePost",
      postid
    },
    "PUT"
  );
  if (!ok) throw new Error(data.message);
  return data;
}

export async function unlikePost(postid) {
  const { ok, data } = await request(
    "/api/posts",
    {
      optype: "unlikePost",
      postid
    },
    "PUT"
  );
  if (!ok) throw new Error(data.message);
  return data;
}
