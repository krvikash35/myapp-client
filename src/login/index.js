import React from "react";
import { Form, Input, Button, notification } from "antd";
import css from "./login.module.css";
import login from "./api";
import { withRouter } from "react-router-dom";
import { APP_NAME } from "../utils/constants";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.state = {
      isLoading: false,
      username: "",
      password: ""
    };
  }

  handleInputChange(e) {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
    this.setState({
      [fieldName]: fieldValue
    });
  }

  handleFormSubmit(e) {
    e.preventDefault();
    this.setState({ isLoading: true }, async () => {
      try {
        await login(this.state.username, this.state.password);
        this.props.onLogin();
        const { from } = this.props.location.state || {
          from: { pathname: "/" }
        };
        this.props.history.replace(from);
      } catch (error) {
        notification.error({
          message: APP_NAME,
          description: error.message
        });
        this.setState({ isLoading: false });
      }
    });
  }

  render() {
    const { username, password, isLoading } = this.state;

    return (
      <div className={css.container}>
        <Form className={css.form} onSubmit={this.handleFormSubmit}>
          <Form.Item label="Username">
            <Input
              name="username"
              size="large"
              placeholder="Enter your username"
              value={username}
              onChange={this.handleInputChange}
            />
          </Form.Item>
          <Form.Item label="Password">
            <Input
              name="password"
              type="password"
              size="large"
              value={password}
              placeholder="Enter your passsword"
              onChange={this.handleInputChange}
            />
          </Form.Item>
          <Form.Item>
            <Button
              htmlType="submit"
              type="primary"
              size="large"
              block={true}
              disabled={isLoading}
            >
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default withRouter(Login);
