import React from "react";
import css from "./post.module.css";
import { Avatar, Icon } from "antd";
import { getAvatarColor, getTimeDifference } from "../utils/api";

export default function Post(props) {
  const { createdByUser, createdAt, likedBy, title, content } = props;
  const { fullname, username } = createdByUser;
  const likesCount = likedBy.length;
  const avatarColor = getAvatarColor("vikash kuma");
  const shortName = fullname.split(" ").reduce((s = "", n) => s + n[0], "");
  const postedAgo = getTimeDifference(new Date(createdAt));

  return (
    <div className={css.post}>
      <div className={css.header}>
        <Avatar
          size="large"
          style={{ backgroundColor: avatarColor }}
          className={css.avatar}
        >
          {shortName}
        </Avatar>
        <div className={css.meta}>
          <div className={css.metatop}>
            <b>vikash Kumar</b>@krvikash35
          </div>
          <div className={css.metabottom}>{postedAgo}</div>
        </div>
        <Icon type="ellipsis" className={css.menu} />
      </div>
      <div className={css.content}>
        <div className={css.title}>{title}</div>
        <div className={css.description}>{content}</div>
      </div>
      <div className={css.footer}>
        <div className={css.footerLeft}>
          {likesCount > 0 &&
            (likesCount === 1 ? "1 Like" : likesCount + " Likes")}
        </div>
        <div className={css.footerRight}>
          <Icon type="heart" style={{ fontSize: "25px" }} />
        </div>
      </div>
    </div>
  );
}
