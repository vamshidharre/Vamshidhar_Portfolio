import React, { lazy, Suspense } from "react";
import "./App.css";

const MainContainer = lazy(() => import("./components/MainContainer"));
import { LoadingProvider } from "./context/LoadingProvider";

const App: React.FC = () => {
  return (
    <LoadingProvider>
      <Suspense fallback={<div className="loading-fallback">INITIALIZING CAE ENVIRONMENT...</div>}>
        <MainContainer />
      </Suspense>
    </LoadingProvider>
  );
};

export default App;
