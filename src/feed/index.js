import React from "react";
import css from "./feed.module.css";
import { Card, List } from "antd";
import Post from "./post";

import { demoPostsData } from "../utils/constants";

class Feed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: demoPostsData
    };
  }

  render() {
    return (
      <div className={css.container}>
        <Post {...demoPostsData[0]} />
        <Post {...demoPostsData[1]} />
        <Post {...demoPostsData[2]} />
        <Post {...demoPostsData[3]} />
        <Post {...demoPostsData[4]} />
      </div>
    );
  }
}

export default Feed;
