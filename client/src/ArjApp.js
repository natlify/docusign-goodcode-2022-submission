import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";

import Homepage from "./components/homepage/Homepage";
import MyMap from "./components/MyMap";
import Shell from "./components/shell/Shell";
import { UserContext } from "./UserContext";

function ArjApp() {
  const { userType } = useContext(UserContext);

  return <MyMap />;
}

export default ArjApp;
