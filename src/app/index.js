import React from "react";
import { Layout, notification } from "antd";
import css from "./app.module.css";
import Footer from "./footer";
import Header from "./header";
import Routing from "./route";
import { withRouter, Route } from "react-router-dom";
import getCurrentUser from "./api";
import Loader from "../components/loader";
import { TOKEN_NAME, APP_NAME } from "../utils/constants";
import Feed from "../feed";
import PostCreate from "../post-create";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.onLogin = this.onLogin.bind(this);
    this.onLogout = this.onLogout.bind(this);
    this.loadCurrentUser = this.loadCurrentUser.bind(this);
    this.state = {
      isLoading: false,
      isLoggedin: false,
      username: "",
      fullname: "",
      userid: ""
    };
  }

  componentDidMount() {
    if (localStorage.getItem(TOKEN_NAME)) {
      this.loadCurrentUser();
    }
  }

  componentWillUnmount() {}

  async loadCurrentUser() {
    try {
      this.setState({});
      this.setState({ isLoading: true });
      const user = await getCurrentUser();
      this.setState({
        isLoading: false,
        isLoggedin: true,
        username: user.username,
        fullname: user.fullname,
        userid: user._id
      });
      this.setState({});
    } catch (error) {
      this.setState({ isLoading: false });
    }
  }

  onLogin() {
    notification.success({
      message: APP_NAME,
      description: "Successfully Logged in"
    });
    this.loadCurrentUser();
  }

  onLogout() {
    localStorage.removeItem(TOKEN_NAME);
    this.setState({ isLoggedin: false });
    notification.success({
      message: APP_NAME,
      description: "Successfully logged out"
    });
  }

  render() {
    const { isLoggedin, username, fullname, isLoading, userid } = this.state;
    if (isLoading) {
      return <Loader />;
    }
    return (
      <>
        <Layout className={css.layout}>
          <Header
            isLoggedin={isLoggedin}
            username={username}
            fullname={fullname}
            onLogout={this.onLogout}
          />
          <Layout.Content className={css.content}>
            <Routing
              userid={userid}
              isLoggedin={isLoggedin}
              onLogin={this.onLogin}
            />
          </Layout.Content>
          {isLoggedin && <PostCreate />}
          <Footer />
        </Layout>
      </>
    );

    return <Feed />;
  }
}

export default withRouter(App);
