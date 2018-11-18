import React from "react";
import css from "./register.module.css";
import { Form, Input, Button, message } from "antd";
import { vlaidateField, vlaidateFields } from "./util";
import register from "./api";
import { withRouter } from "react-router-dom";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this._isMounted = false;
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.isFormValid = this.isFormValid.bind(this);
    this.state = {
      isLoading: false,
      fullname: {
        value: "",
        validateStatus: "",
        help: ""
      },
      username: {
        value: "",
        validateStatus: "",
        help: ""
      },
      password: {
        value: "",
        validateStatus: "",
        help: ""
      }
    };
  }

  componentDidMount() {
    this._isMounted = true;
  }
  componentWillUnmount() {
    this._isMounted = false;
  }

  async handleFormSubmit(e) {
    e.preventDefault();
    if (this.isFormValid()) {
      this.setState({ isLoading: true });
      const hideLoader = message.loading("Wait...", 2);
      try {
        const msg = await register({
          fullname: this.state.fullname.value,
          username: this.state.username.value,
          password: this.state.password.value
        });
        if (!this._isMounted) return;
        this.setState({ isLoading: false });
        await hideLoader();
        await message.success(msg, 1);
        this.props.history.push("/login");
      } catch (err) {
        if (!this._isMounted) return;
        this.setState({ isLoading: false });
        await hideLoader();
        await message.error(err.message);
      }
    } else {
      this.setState({
        ...vlaidateFields(this.state)
      });
    }
  }

  handleInputChange(e) {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
    this.setState({
      [fieldName]: {
        value: fieldValue,
        ...vlaidateField(fieldName, fieldValue)
      }
    });
  }

  isFormValid() {
    return (
      this.state.fullname.validateStatus === "success" &&
      this.state.username.validateStatus === "success" &&
      this.state.password.validateStatus === "success"
    );
  }

  render() {
    const { fullname, username, password, isLoading } = this.state;
    return (
      <div className={css.container} onSubmit={this.handleFormSubmit}>
        <Form className={css.form}>
          <Form.Item
            required
            label="Full Name"
            validateStatus={fullname.validateStatus}
            help={fullname.help}
          >
            <Input
              name="fullname"
              size="large"
              placeholder="Enter your full name"
              value={fullname.value}
              onChange={this.handleInputChange}
            />
          </Form.Item>
          <Form.Item
            required
            label="Username"
            validateStatus={username.validateStatus}
            help={username.help}
          >
            <Input
              name="username"
              size="large"
              placeholder="Enter unique username"
              value={username.value}
              onChange={this.handleInputChange}
            />
          </Form.Item>
          <Form.Item
            required
            label="Password"
            validateStatus={password.validateStatus}
            help={password.help}
          >
            <Input
              type="password"
              name="password"
              size="large"
              placeholder="Enter memorable password"
              value={password.value}
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
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default withRouter(Register);
