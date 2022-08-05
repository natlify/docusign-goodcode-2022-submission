import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";

import Homepage from "./components/homepage/Homepage";
import Shell from "./components/shell/Shell";
import { UserContext } from "./UserContext";

function App() {
  const { userType } = useContext(UserContext);

  return (
    <Routes>
      <Route
        path="/*"
        element={
          userType === "user" ? (
            <Shell />
          ) : userType === "guest" ? (
            <Shell />
          ) : (
            <Homepage />
          )
        }
      />
    </Routes>
  );
}

export default App;
