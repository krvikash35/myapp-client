import React from "react";
import css from "./post.module.css";
import { Avatar, Icon, Button, notification, Tooltip } from "antd";
import { getAvatarColor, getTimeDifference } from "../../utils/api";
import { likePost, unlikePost } from "./api";
import { APP_NAME } from "../../utils/constants";
import { withRouter } from "react-router-dom";

class Post extends React.PureComponent {
  constructor(props) {
    super(props);
    this.likePost = this.likePost.bind(this);
    this.unlikePost = this.unlikePost.bind(this);
    this.state = {
      likedBy: this.props.likedBy,
      isLoading: false
    };
  }

  isAuthRedirect() {
    if (this.props.isLoggedin) {
      return false;
    }
    this.props.history.push("/login");
    return true;
  }

  async likePost() {
    if (this.isAuthRedirect()) return;
    if (this.isLoading) return;
    try {
      await likePost(this.props._id);
      this.state.likedBy.push(this.props.userid);
      this.setState({});
    } catch (error) {
      notification.error({ message: APP_NAME, description: error.message });
    }
  }

  async unlikePost() {
    if (this.isAuthRedirect()) return;
    if (this.isLoading) return;
    try {
      await unlikePost(this.props._id);
      this.state.likedBy = this.state.likedBy.filter(
        u => u !== this.props.userid
      );
      this.setState({});
    } catch (error) {
      notification.error({ message: APP_NAME, description: error.message });
    }
  }

  render() {
    const { likedBy } = this.state;
    const {
      _id,
      createdByUser,
      createdAt,
      title,
      content,
      userid,
      isLoggedin
    } = this.props;
    const { fullname, username, _id: ownerUserid } = createdByUser;
    const likesCount = likedBy.length;
    const avatarColor = getAvatarColor(fullname);
    const shortName = fullname.split(" ").reduce((s = "", n) => s + n[0], "");
    const postedAgo = getTimeDifference(new Date(createdAt));
    const isLiked = isLoggedin ? likedBy.some(p => p === userid) : false;
    const isOwner = isLoggedin ? ownerUserid === userid : false;

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
              <b>{fullname}</b>@{username}
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
            {_id}
          </div>
          <div className={css.footerRight}>
            {isLiked ? (
              <Tooltip placement="top" title="Unlike">
                <Button
                  className={css.likedHeart}
                  shape="circle"
                  onClick={this.unlikePost}
                >
                  <Icon type="heart" theme="filled" />
                </Button>
              </Tooltip>
            ) : (
              <Tooltip placement="top" title="Like">
                <Button
                  className={css.heart}
                  shape="circle"
                  onClick={this.likePost}
                >
                  <Icon type="heart" />
                </Button>
              </Tooltip>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Post);
