import Home from "features/home/page";
import GlobalStyles from "./styles/GlobalStyles";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AppContainer from "components/app-container";
import theme from "theme";
import ErrorBoundary from "components/error-boundary";
import Header from "components/app-header";
import { ThemeProvider } from "styled-components";

const caption = {
  appTitle: "Github Searcher",
  appDescription: "Search user or repositories below",
};

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <ErrorBoundary>
          <GlobalStyles />
          <Header
            title={caption.appTitle}
            description={caption.appDescription}
          />
          <AppContainer>
            <Router>
              <Routes>
                <Route path="/" element={<Home />} />
              </Routes>
            </Router>
          </AppContainer>
        </ErrorBoundary>
      </ThemeProvider>
    </div>
  );
}

export default App;
