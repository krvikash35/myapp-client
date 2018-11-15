import React from "react";
import Brand from "../brand";
import Layout from "./layout";
import css from "./header.module.css";

const Avatar = () => <h1 className={css.avtar}>V</h1>;

export default function Header(props) {
  const { isLoggedin, appName } = props;
  // const comp = <div className={css.avtar}>V</div>;
  return (
    <>
      <Layout
        left={<Brand appName={appName} />}
        middle={<Avatar />}
        right={<Avatar />}
      />
    </>
  );
}
