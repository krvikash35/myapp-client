import React from "react";

import { Spin, Icon } from "antd";

export default function Loader() {
  const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;
  return (
    <Spin
      indicator={antIcon}
      style={{ marginLeft: "50%", marginTop: "10px" }}
    />
  );
}
