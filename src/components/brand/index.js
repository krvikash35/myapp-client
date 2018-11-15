import React from "react";
import logo from "../../static/icons/brand-sysleaf.svg";
import css from "./brand.module.css";

export default props => (
  <a className={css.container} href="/">
    <img className={css.icon} src={logo} alt="logo" />
    <span className={css.appName}>{props.appName}</span>
  </a>
);
