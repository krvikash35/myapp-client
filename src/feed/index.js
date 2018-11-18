import React from "react";
import css from "./feed.module.css";
import { Card, List } from "antd";
import Post from "./post";
import Loader from "../components/loader";
import getPosts from "./api";

import { demoPostsData } from "../utils/constants";

class Feed extends React.Component {
  constructor(props) {
    super(props);
    this.loadPosts = this.loadPosts.bind(this);
    this.state = {
      isLoading: false,
      posts: []
    };
  }

  componentDidMount() {
    this.loadPosts();
  }

  async loadPosts() {
    this.setState({ isLoading: true });
    const posts = await getPosts();
    this.setState({ isLoading: false, posts });
  }

  render() {
    const { isLoading } = this.state;
    if (isLoading) return <Loader />;
    const postList = this.state.posts.map(post => (
      <Post key={post._id} {...post} />
    ));
    return <div className={css.container}>{postList}</div>;
  }
}

export default Feed;
