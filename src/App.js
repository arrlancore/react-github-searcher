import Home from "features/home/page";
import GlobalStyles from "./styles/GlobalStyles";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AppContainer from "components/app-container";
import theme from "theme";
import ErrorBoundary from "components/error-boundary";

function App() {
  return (
    <div className="App">
      <ErrorBoundary>
        <GlobalStyles />
        <AppContainer theme={theme}>
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </Router>
        </AppContainer>
      </ErrorBoundary>
    </div>
  );
}

export default App;
