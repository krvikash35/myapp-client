import React from "react";
import { Modal, Button, Form, Input, message, notification } from "antd";
import createPost from "./api";
import { APP_NAME, ADD_NEW_POST_FEED } from "../utils/constants";
import myevent from "../utils/event";

class PostCreateDialog extends React.Component {
  state = {
    title: "",
    content: "",
    isLoading: false,
    errMsg: ""
  };

  handleFormSubmit = async e => {
    e.preventDefault();
    const title = this.state.title;
    const content = this.state.content;
    if (!title || !content) {
      message.error("Please enter title and content");
    } else {
      try {
        this.setState({ isLoading: true });
        const res = await createPost(title, content);
        this.setState({ isLoading: false });
        myevent.dispatch(ADD_NEW_POST_FEED, res.data._id);
        this.props.closeDialog();
        notification.success({
          message: APP_NAME,
          description: res.message
        });
      } catch (error) {
        message.error(error.message);
        this.setState({ isLoading: false });
      }
    }
  };

  handleInputChange = e => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
    this.setState({
      [fieldName]: fieldValue
    });
  };

  render() {
    const { isOpen, closeDialog } = this.props;
    const { isLoading } = this.state;

    return (
      <div>
        <Modal
          title="Create New Post"
          visible={isOpen}
          onCancel={closeDialog}
          centered={true}
          footer={null}
          destroyOnClose
        >
          <Form onSubmit={this.handleFormSubmit}>
            <Form.Item label="Title">
              <Input
                name="title"
                placeholder="Enter post title"
                onChange={this.handleInputChange}
              />
            </Form.Item>
            <Form.Item label="Content">
              <Input.TextArea
                rows={3}
                name="content"
                placeholder="Enter post content"
                onChange={this.handleInputChange}
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={isLoading}>
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default PostCreateDialog;
