import React, { Suspense } from "react";
import RoutesProvider from "./providers/routes.provider";
import "./global.css";
import Spinner from "./components/spinner";

const App = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <RoutesProvider />
    </Suspense>
  );
};

export default App;
