import React from "react";
import css from "./feed.module.css";
import { Card, List } from "antd";
import Post from "../components/post";
import Loader from "../components/loader";
import getPosts from "./api";

import { demoPostsData } from "../utils/constants";

class Feed extends React.Component {
  constructor(props) {
    super(props);
    this._isUnmounted = true; // since native promise does not support cancelling request, use this approach to solve unsubscrible issue
    this.loadPosts = this.loadPosts.bind(this);
    this.state = {
      isLoading: false,
      posts: []
    };
  }

  componentDidMount() {
    this._isUnmounted = false;
    this.loadPosts();
  }

  componentWillUnmount() {
    this._isUnmounted = true;
  }

  async loadPosts() {
    this.setState({ isLoading: true });
    const posts = await getPosts();
    if (this._isUnmounted) return;
    this.setState({ isLoading: false, posts });
  }

  render() {
    const { isLoading } = this.state;
    const { isLoggedin, userid } = this.props;

    if (isLoading) return <Loader />;
    const postList = this.state.posts.map(post => (
      <Post isLoggedin={isLoggedin} userid={userid} key={post._id} {...post} />
    ));
    return <div className={css.container}>{postList}</div>;
  }
}

export default Feed;
