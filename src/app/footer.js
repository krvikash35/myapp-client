import React from "react";
import { Layout } from "antd";
import css from "./footer.module.css";

export default function Footer() {
  return (
    <Layout.Footer className={css.footer}>
      <a
        className={css.link}
        href="https://sysleaf.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        Syleaf
      </a>
      &copy; 2018-19
    </Layout.Footer>
  );
}
