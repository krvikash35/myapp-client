import React from "react";
import { Layout, Menu, Dropdown, Icon, Avatar } from "antd";
import css from "./header.module.css";
import logo from "../../../static/images/brand_icon_32x32.png";
import { APP_NAME } from "../../../constants";
import { Link, withRouter } from "react-router-dom";

const Header = function Header(props) {
  const { isLoggedIn, location } = props;
  let menu;

  if (isLoggedIn) {
    const userSubmenu = (
      <Menu>
        <Menu.Item disabled={true} key="userInfo">
          <span className={css.userInfoContainer}>
            <span className={css.fullName}>Vikash Kumar</span>
            <span className={css.username}>@krvikash35 </span>
          </span>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="/dashboard">Dashboard</Menu.Item>
        <Menu.Item key="/posts">Posts</Menu.Item>
        <Menu.Item key="/polls">Polls</Menu.Item>
        <Menu.Item key="/todos">Todos</Menu.Item>
        <Menu.Item key="/logout">Logout</Menu.Item>
      </Menu>
    );
    menu = (
      <Dropdown className={css.userMenu} overlay={userSubmenu}>
        <Icon type="user" />
      </Dropdown>
    );
  } else {
    menu = [
      <Menu.Item key="/login" className={css.menuItem}>
        <Link to="/login">Login</Link>
      </Menu.Item>,
      <Menu.Item key="/register" className={css.menuItem}>
        <Link to="/register">Register</Link>
      </Menu.Item>
    ];
  }

  return (
    <Layout.Header className={css.header}>
      <Avatar src={logo} /> {APP_NAME}
      <Menu
        mode="horizontal"
        className={css.menu}
        selectedKeys={[location.pathname]}
      >
        {menu}
      </Menu>
    </Layout.Header>
  );
};

export default withRouter(Header);
