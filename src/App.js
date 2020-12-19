import React, { memo, Suspense } from "react";

import { HashRouter } from "react-router-dom";

import routes from "@/router";

import { renderRoutes } from "react-router-config";

const App = memo(function App() {
  return (
    <HashRouter className="App">
      <Suspense fallback={<div>page Loading</div>}>
        {renderRoutes(routes)}
      </Suspense>
    </HashRouter>
  );
});

export default App;
