import { Button, Card, Col, Modal, Row, Select, Typography } from "antd";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  clearQuestions,
  loadQuestions,
  setCategory,
  setDifficulty,
  setRegion,
} from "../actions";
import { categories } from "../constants/categories";
import { countries } from "../constants/countries";
import { levels } from "../constants/levels";

const StartQuiz = () => {
  const { region, limit, difficulty, category, completed } = useSelector(
    (state) => state.common
  );

  const startQuizOptions = {
    limit,
    region,
    category,
    difficulty,
  };

  useEffect(() => {
    if (completed) {
      clearQuestions();
    }
  }, [completed]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "80vh",
      }}
    >
      <Card style={{ padding: 23 }}>
        <Row
          gutter={[12, 25]}
          style={{ backgroundColor: "white", maxWidth: 350 }}
        >
          <Col span={24}>
            <Typography.Text>1. Select your region*</Typography.Text>
          </Col>
          <Col span={24}>
            <Select
              onChange={(value) =>
                setRegion(
                  countries.filter((country) => country.code === value)[0]
                )
              }
              value={region.code}
              style={{ width: "100%" }}
            >
              {countries.map((item, itemIndex) => (
                <Select.Option
                  value={item.code}
                  key={`countries_list_item_${item.name}`}
                >
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </Col>
          <Col span={24}>
            <Typography.Text>2. Select question category*</Typography.Text>
          </Col>
          <Col span={24}>
            <Select
              onChange={(value) => setCategory(value)}
              value={category}
              style={{ width: "100%" }}
            >
              {categories.map((item, itemIndex) => (
                <Select.Option
                  value={item.code}
                  key={`countries_list_item_${item.name}`}
                >
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </Col>
          <Col span={24}>
            <Typography.Text>3. Select difficulty level*</Typography.Text>
          </Col>
          <Col span={24}>
            <Select
              onChange={(value) =>
                setDifficulty(
                  levels.filter((level) => level.value === value)[0]
                )
              }
              value={difficulty}
              style={{ width: "100%" }}
            >
              {levels.map((item, itemIndex) => (
                <Select.Option
                  value={item.value}
                  key={`countries_list_item_${item.name}`}
                >
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </Col>
          <Col span={24}>
            <Button
              onClick={() =>
                Modal.confirm({
                  title: "Start Quiz",
                  content: "Are you sure you want to start the quiz?",
                  onOk: () => {
                    loadQuestions(startQuizOptions);
                  },
                  okText: "Yes",
                  okType: "primary",
                })
              }
              block
              type="primary"
            >
              Start Quiz
            </Button>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default StartQuiz;
