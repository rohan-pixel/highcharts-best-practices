import React, { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Loading from "./Components/Loading";

// lazy loading
const StaticPage = lazy(() => import("./Components/StaticCharts"));
const DynmicPage = lazy(() => import("./Components/DynamicCharts"));

const App = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/">
          <Route index element={<StaticPage />} />
          <Route path="loading" element={<Loading />} />
          <Route path="dynamic" element={<DynmicPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default App;
