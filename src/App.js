import * as React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Resume from "./page/Resume";

export const TokenContext = React.createContext(null);

export default function App() {
  const [tokenContext, setTokenContext] = React.useState(
    localStorage.getItem("login_token")
  );

  return (
    <TokenContext.Provider value={{ tokenContext, setTokenContext }}>
      <Router>
        <Routes>
          <Route path="/" element={<Resume />} />
        </Routes>
      </Router>
    </TokenContext.Provider>
  );
}
