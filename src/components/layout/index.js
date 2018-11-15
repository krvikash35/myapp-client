import React from "react";
import "./layout.css";

export default ({ header, content, footer }) => (
  <div className="app">
    <div className="app-header">{header}</div>
    <div className="app-content">{content}</div>
    <div className="app-footer">{footer}</div>
  </div>
);
