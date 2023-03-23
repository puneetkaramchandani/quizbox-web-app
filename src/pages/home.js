import { Button, Col, Row, theme, Typography } from "antd";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { clearQuestions } from "../actions";
import logo from "../assets/images/logo.png";

const Home = () => {
  const {
    token: { colorPrimary },
  } = theme.useToken();

  const { completed } = useSelector((state) => state.common);
  useEffect(() => {
    if (completed) {
      clearQuestions();
    }
  }, [completed]);
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img height={100} alt="QuizBox" src={logo} />
      <div>
        <Typography.Title style={{ color: colorPrimary }}>
          Quiz Box
        </Typography.Title>
        <Button href="/startQuiz" block type="primary">
          Play Now
        </Button>
      </div>
    </div>
  );
};

export default Home;
