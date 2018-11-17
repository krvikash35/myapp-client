import React from "react";
import { Layout } from "antd";
import css from "./app.module.css";
import Footer from "./footer";
import Header from "./header";
import Routing from "./route";
import Register from "../register";

class App extends React.Component {
  render() {
    return (
      <>
        <Layout className={css.layout}>
          <Header isLoggedin={false} />
          <Layout.Content className={css.content}>
            <Routing isLoggedin={false} />
          </Layout.Content>
          <Footer />
        </Layout>
      </>
    );
  }
}

export default App;
