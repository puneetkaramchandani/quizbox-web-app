import React from "react";
import PropTypes from "prop-types";
import { ConfigProvider } from "antd";

const ThemeProvider = ({ children }) => (
  <ConfigProvider
    theme={{
      token: {
        colorPrimary: "#009a66",
      },
    }}
  >
    {children}
  </ConfigProvider>
);

ThemeProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default ThemeProvider;
