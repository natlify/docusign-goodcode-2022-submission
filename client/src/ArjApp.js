import { Text } from "@mantine/core";
import React from "react";
import AppShellDemo from "./components/shell/Shell";
import ImageGallery from "./pages/ImageGallery";

// import MyMap from "./components/MyMap";

function ArjApp() {
  return (
    <AppShellDemo>
      <ImageGallery />
    </AppShellDemo>
  );
}

export default ArjApp;
