import { Button, Card, Radio, Result, Space, theme, Typography } from "antd";
import { isEmpty, shuffle, startCase } from "lodash";
import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { SmileOutlined } from "@ant-design/icons";
import { setCompleted } from "../actions";

const PlayQuiz = () => {
  const {
    token: { colorPrimary },
  } = theme.useToken();
  const { questions, completed } = useSelector((state) => state.common);
  const [state, setState] = useState({
    currentQuestion: 0,
    selectedAnswer: null,
    score: 0,
    correctAnswers: 0,
    incorrectAnswers: 0,
    completed: false,
    totalQuestions: questions?.length,
  });

  const shuffledArray = useMemo(
    () =>
      shuffle([
        ...questions[state.currentQuestion]?.incorrectAnswers,
        questions[state.currentQuestion]?.correctAnswer,
      ]),
    [state.currentQuestion]
  );

  const handleNext = () => {
    const isLastQuestion = state.currentQuestion === questions?.length - 1;

    if (
      state.selectedAnswer === questions[state.currentQuestion]?.correctAnswer
    ) {
      setState({
        ...state,
        selectedAnswer: null,
        score: state.score + 1,
        correctAnswers: state.correctAnswers + 1,
        currentQuestion: isLastQuestion
          ? state.currentQuestion
          : state.currentQuestion + 1,
        completed: isLastQuestion,
      });
    } else {
      setState({
        ...state,
        selectedAnswer: null,
        currentQuestion: isLastQuestion
          ? state.currentQuestion
          : state.currentQuestion + 1,
        completed: isLastQuestion,
        incorrectAnswers: state.incorrectAnswers + 1,
      });
    }
    if (isLastQuestion) {
      setCompleted(true);
    }
  };

  useEffect(() => {
    if (completed) {
      location.replace("/startQuiz");
    }
  }, []);

  if (completed && !state.completed) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "80vh",
        }}
      >
        <Typography.Text
          style={{ color: colorPrimary, fontSize: 22 }}
          type="primary"
        >
          The quiz has ended now.
        </Typography.Text>
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "80vh",
      }}
    >
      <Card
        style={{
          width: "500px",
          height:"400px"
        }}
      >
        {state.completed && (
          <div>
            <Result
              status="success"
              icon={<SmileOutlined />}
              subTitle={`Score - ${state.score}`}
              title="Keep it up, you did your best!"
              extra={
                <div>
                  <div>{`Total Questions - ${state.totalQuestions}, Correct Answers - ${state.correctAnswers}, Incorrect Answers - ${state.incorrectAnswers}`}</div>
                  <Button
                    href="/startQuiz"
                    style={{ marginTop: 22, minWidth: 120 }}
                    type="primary"
                  >
                    Start New
                  </Button>
                </div>
              }
            />
          </div>
        )}
        {!state.completed && (
          <div
            style={{
              padding: 12,
            }}
          >
            <div
              style={{
                padding: 12,
              }}
            >{`Q${state.currentQuestion + 1}. ${
              questions[state.currentQuestion]?.question
            }`}</div>
            <div>
              <Radio.Group
                style={{
                  padding: 12,
                }}
                onChange={(e) => {
                  setState({ ...state, selectedAnswer: e.target.value });
                }}
                value={state.selectedAnswer}
              >
                <Space direction="vertical">
                  {shuffledArray.map((ans, index) => (
                    <Radio
                      key={`${
                        questions[state.currentQuestion]?.id
                      }_ans_${index}`}
                      value={ans}
                    >
                      {startCase(ans)}
                    </Radio>
                  ))}
                </Space>
              </Radio.Group>
            </div>
            <div
              style={{
                padding: 12,
              }}
            >
              <Button
                onClick={() => handleNext()}
                disabled={isEmpty(state.selectedAnswer)}
                block
                type="primary"
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default PlayQuiz;
