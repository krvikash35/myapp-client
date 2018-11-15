import React from "react";
import { APP_NAME } from "./constants";
import { Layout, Menu, Avatar, Icon } from "antd";
import css from "./app.module.css";
import logo from "../../static/images/brand_icon_32x32.png";

const { Header, Content, Footer } = Layout;
const { SubMenu, Divider } = Menu;

class App extends React.Component {
  render() {
    return (
      <>
        <Layout className={css.layout}>
          <Header className={css.header}>
            <Avatar src={logo} />
            App
            <Menu mode="horizontal" className={css.menu}>
              <Menu.Item key="1" className={css.menuItem}>
                Login
              </Menu.Item>
              <Menu.Item key="2" className={css.menuItem}>
                Logout
              </Menu.Item>
              <SubMenu title={<Icon type="user" />} className={css.userMenu}>
                <Menu.Item
                  disabled={true}
                  key="setting:1"
                  className={css.menuUserInfo}
                >
                  <span className={css.userInfoContainer}>
                    <span className={css.fullName}>Vikash Kumar</span>
                    <span className={css.username}>@krvikash35 </span>
                  </span>
                </Menu.Item>
                <Divider />
                <Menu.Item key="setting:3">Option 3</Menu.Item>
                <Menu.Item key="setting:4">Option 4</Menu.Item>
                <Menu.Item key="setting:5">Option 4</Menu.Item>
                <Menu.Item key="setting:6">Logout</Menu.Item>
              </SubMenu>
            </Menu>
          </Header>
          <Content className={css.content}>
            contentcontentconte ntcontentc ontentcontentcont entcontentconte
            ntcontentcontentcontent contentcontentcontentco ntentcontentcontent
            <br />
            content
            <br />
            content
            <br />
            content
            <br />
            content
            <br />
            content
            <br />
            content
            <br />
            <br />
          </Content>
          <Footer className={css.footer}>
            <a className={css.link} href="https://sysleaf.com" target="_blank">
              Syleaf
            </a>
            &copy; 2018-19
          </Footer>
        </Layout>
      </>
    );
  }
}

export default App;
