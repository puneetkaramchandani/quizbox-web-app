import { Spin } from "antd";
import React from "react";

const Spinner = () => {
  return (
    <div
      style={{
        position: "absolute",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 10,
        minHeight: "100vh",
        width:"100%",
      }}
    >
      <Spin size="large"/>
    </div>
  );
};

export default Spinner;
