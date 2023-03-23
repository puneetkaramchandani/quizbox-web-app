import React from "react";
import { Button, theme, Typography } from "antd";
import { Outlet } from "react-router-dom";
import Logo from "../assets/images/logo.png";
import Layout, { Content, Footer, Header } from "antd/es/layout/layout";
import { useSelector } from "react-redux";
import Spinner from "../components/spinner";

const RootLayout = () => {
  const {
    token: { colorPrimary },
  } = theme.useToken();

  const { isLoading } = useSelector((state) => state.common);

  return (
    <Layout style={{ backgroundColor: "transparent" }}>
      {isLoading && <Spinner />}
      <Header style={{ backgroundColor: "transparent" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <a
              href="/"
              style={{
                fontSize: 28,
                color: colorPrimary,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 600,
              }}
            >
              <img height={30} width={30} alt="QuizBox" src={Logo} />
              <span style={{ marginLeft: 12 }}>Quiz Box</span>
            </a>
          </div>
          <div>
            <Button href="/" block type="primary">
              Home
            </Button>
          </div>
        </div>
      </Header>
      <Content
        style={{
          minHeight: "80vh",
        }}
      >
        <Outlet />
      </Content>
      <Footer
        style={{
          backgroundColor: "transparent",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <p>&copy; Copyright Quiz Box 2023</p>
        </div>
      </Footer>
    </Layout>
  );
};

export default RootLayout;
