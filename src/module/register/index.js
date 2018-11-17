import React from "react";
import css from "./register.module.css";
import { Form, Input, Button, message } from "antd";
import { vlaidateField, vlaidateFields } from "./util";
import register from "./api";
import { withRouter } from "react-router-dom";

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 }
  }
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0
    },
    sm: {
      span: 16,
      offset: 8
    }
  }
};

class Register extends React.Component {
  constructor(props) {
    super(props);
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
        this.setState({ isLoading: false });
        await hideLoader();
        await message.success(msg, 1);
        this.props.history.push("/login");
      } catch (err) {
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
      <div className={css.formContainer} onSubmit={this.handleFormSubmit}>
        <Form className={css.form}>
          <Form.Item
            {...formItemLayout}
            required
            label="Full Name"
            validateStatus={fullname.validateStatus}
            help={fullname.help}
          >
            <Input
              name="fullname"
              size="large"
              value={fullname.value}
              onChange={this.handleInputChange}
            />
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            required
            label="Username"
            validateStatus={username.validateStatus}
            help={username.help}
          >
            <Input
              name="username"
              size="large"
              value={username.value}
              onChange={this.handleInputChange}
            />
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            required
            label="Password"
            validateStatus={password.validateStatus}
            help={password.help}
          >
            <Input
              type="password"
              name="password"
              size="large"
              value={password.value}
              onChange={this.handleInputChange}
            />
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
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
