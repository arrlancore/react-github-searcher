import Home from "features/home/page";
import GlobalStyles from "./styles/GlobalStyles";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AppContainer from "components/app-container";
import theme from "theme";

function App() {
  return (
    <div className="App">
      <GlobalStyles />
      <AppContainer theme={theme}>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </Router>
      </AppContainer>
    </div>
  );
}

export default App;
