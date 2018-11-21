import React from "react";
import { Button, Tooltip } from "antd";
import css from "./post-create.module.css";
import PostCreateDialog from "./createDailog";

class PostCreate extends React.Component {
  state = {
    isOpen: true
  };
  openDialog = () => {
    this.setState({ isOpen: true });
  };

  closeDialog = () => {
    this.setState({ isOpen: false });
  };

  render() {
    const { isOpen } = this.state;

    return (
      <div className={css.postCreate}>
        <div className={css.container}>
          <PostCreateDialog isOpen={isOpen} closeDialog={this.closeDialog} />
          <Tooltip placement="top" title="Create new post">
            <Button
              className={css.createBtn}
              type="primary"
              shape="circle"
              icon="plus"
              size="large"
              onClick={this.openDialog}
            />
          </Tooltip>
        </div>
      </div>
    );
  }
}

export default PostCreate;
