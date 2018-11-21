import React from "react";
import css from "./feed.module.css";
import { notification } from "antd";
import Post from "../components/post";
import Loader from "../components/loader";
import getPosts from "./api";
import { POST_SIZE_PER_FETCH } from "./constants";

import { demoPostsData, APP_NAME } from "../utils/constants";
import { debounce, throttle } from "../utils/api";

class Feed extends React.Component {
  constructor(props) {
    super(props);
    this._isUnmounted = true; // since native promise does not support cancelling request, use this approach to solve unsubscrible issue
    this.loadPosts = this.loadPosts.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.handleScrollDebounced = debounce(this.handleScroll);
    this.page = 1;
    this.ticking = false;
    this.lastPos = 0;
    this.state = {
      isLoading: true,
      isLoadingMore: false,
      isLastPage: true,
      posts: [],
      isLastPage: false
    };
  }

  componentDidMount() {
    console.log("mounted", this.state.posts);
    this._isUnmounted = false;
    this.loadPosts();
    window.addEventListener("scroll", this.handleScrollDebounced);
  }

  componentWillUnmount() {
    this._isUnmounted = true;
    window.removeEventListener("scroll", this.handleScrollDebounced);
  }

  handleScroll = () => {
    if (!this.ticking) {
      window.requestAnimationFrame(() => {
        this.ticking = false;
        if (this.state.isLastPage || this.state.isLoadingMore) return;
        const scrollHeight = document.documentElement.scrollHeight;
        const currentPos = window.innerHeight + window.scrollY;
        const isScrollingDown = currentPos - this.lastPos > 0;
        const isScrollNearBottom = currentPos >= scrollHeight - 500;
        this.lastPos = currentPos;
        if (isScrollingDown && isScrollNearBottom) {
          this.loadMorePosts();
        }
      });
      this.ticking = true;
    }
  };

  loadPosts() {
    this.setState({ isLoading: true }, async () => {
      try {
        const posts = await getPosts(1);
        this.setState({
          isLoading: false,
          posts: [...this.state.posts, ...posts]
        });
      } catch (error) {
        this.setState({ isLoading: false });
        notification.error({ message: APP_NAME, description: error.message });
      }
    });
  }

  loadMorePosts() {
    this.setState({ isLoadingMore: true }, async () => {
      try {
        const posts = await getPosts(++this.page);
        const pcount = posts.length;
        const isLastPage = pcount === 0 || pcount < POST_SIZE_PER_FETCH;
        this.setState({
          isLastPage,
          isLoadingMore: false,
          posts: [...this.state.posts, ...posts]
        });
      } catch (error) {
        this.setState({ isLoadingMore: false });
        notification.error({ message: APP_NAME, description: error.message });
      }
    });
  }

  render() {
    console.log("parent rendering");
    const { isLoading, isLoadingMore, isLastPage, posts } = this.state;
    const { isLoggedin, userid } = this.props;

    if (isLoading) return <Loader />;
    if (posts.length === 0)
      return (
        <div style={{ marginTop: "20px" }} className={css.infoCard}>
          No post found!
        </div>
      );

    const postList = posts.map(post => (
      <Post isLoggedin={isLoggedin} userid={userid} key={post._id} {...post} />
    ));
    return (
      <div className={css.container}>
        {postList}
        {isLoadingMore && <Loader />}
        {isLastPage && <div className={css.infoCard}>That's all we have</div>}
      </div>
    );
  }
}

export default Feed;
