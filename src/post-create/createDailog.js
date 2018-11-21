import React from "react";
import { Modal, Button, Form, Input, Alert } from "antd";
import createPost from "./api";

class PostCreateDialog extends React.Component {
  state = {
    title: "",
    content: "",
    isLoading: true,
    errMsg: ""
  };

  handleFormSubmit = async e => {
    e.preventDefault();
    const title = this.state.title;
    const content = this.state.content;
    if (!title || !content) {
      this.setState({ errMsg: "Please enter title and content" });
    } else {
      try {
        await createPost(title, content);
        this.setState({ isLoading: false, errMsg: "" });
      } catch (error) {
        this.setState({ isLoading: false, errMsg: error.message });
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
    const { errMsg } = this.state;

    return (
      <div>
        <Modal
          title="Create New Post"
          visible={isOpen}
          onOk={closeDialog}
          onCancel={closeDialog}
          centered={true}
          footer={null}
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
                name="content"
                placeholder="Enter post content"
                onChange={this.handleInputChange}
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
          {errMsg && <Alert message={errMsg} type="error" />}
        </Modal>
      </div>
    );
  }
}

export default PostCreateDialog;
