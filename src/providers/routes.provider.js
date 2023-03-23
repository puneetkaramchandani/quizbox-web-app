import React, { lazy } from "react";
import RootLayout from "../layouts";
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";

const Home = lazy(() => import("../pages/home"));
const PlayQuiz = lazy(() => import("../pages/playQuiz"));
const StartQuiz = lazy(() => import("../pages/startQuiz"));
const PageNotFound = lazy(() => import("../pages/404"));

const RoutesProvider = () => {
  const { questions } = useSelector((state) => state.common);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route element={<RootLayout />}>
        <Route path="/startQuiz" element={<StartQuiz />} />
        {Boolean(questions.length) && (
          <Route path="/playQuiz" element={<PlayQuiz />} />
        )}
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default RoutesProvider;
