import React from "react";
import css from "./feed.module.css";
import { Card, List } from "antd";
import Post from "../components/post";
import Loader from "../components/loader";
import getPosts from "./api";

import { demoPostsData } from "../utils/constants";

let ticking = false;
let lastPos = 0;

class Feed extends React.Component {
  constructor(props) {
    super(props);
    this._isUnmounted = true; // since native promise does not support cancelling request, use this approach to solve unsubscrible issue
    this.loadPosts = this.loadPosts.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.page = 1;
    this.state = {
      isLoading: false,
      isLoadingMore: false,
      posts: [],
      isLastPage: false
    };
  }

  componentDidMount() {
    console.log("mounted", this.state.posts);
    this._isUnmounted = false;
    this.loadPosts();
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    this._isUnmounted = true;
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll = () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        ticking = false;
        const scrollHeight = document.documentElement.scrollHeight;
        const currentPos = window.innerHeight + window.scrollY;
        const isScrollingDown = currentPos - lastPos > 0;
        const isScrollNearBottom = currentPos >= scrollHeight - 500;
        lastPos = currentPos;
        if (isScrollingDown && isScrollNearBottom) {
          this.loadMorePosts(++this.page);
          console.log("fetch new", this.page);
        }
      });

      ticking = true;
    }
  };

  async loadPosts(page = 1) {
    // this.setState({ isLoading: true });
    const posts = await getPosts(page);
    if (this._isUnmounted) return;
    this.setState({ posts: [...this.state.posts, ...posts] });
  }

  async loadMorePosts(page) {
    if (this.state.isLoadingMore) return;
    this.setState({ isLoadingMore: true });
    const posts = await getPosts(page);
    if (this._isUnmounted) return;
    this.setState({
      isLoadingMore: false,
      posts: [...this.state.posts, ...posts]
    });
  }

  render() {
    const { isLoading } = this.state;
    const { isLoggedin, userid } = this.props;

    // if (isLoading) return <Loader />;
    const postList = this.state.posts.map(post => (
      <Post isLoggedin={isLoggedin} userid={userid} key={post._id} {...post} />
    ));
    return <div className={css.container}>{postList}</div>;
  }
}

export default Feed;
