import React from "react";
import css from "./layout.module.css";

export default function Layout(props) {
  const { left, middle, right } = props;
  return (
    <div className={css.layout}>
      <div className={css.left}>{left}</div>
      <div className={css.middle}>{middle}</div>
      <div className={css.right}>{right}</div>
    </div>
  );
}
