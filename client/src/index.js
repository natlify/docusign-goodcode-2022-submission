import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { NotificationsProvider } from "@mantine/notifications";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { createRoot } from "react-dom/client";

import "./styles/main.css";
import { modalProps } from "./utils/modalProps";
import { theme } from "./styles/theme";
import App from "./App";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <MantineProvider withGlobalStyles withNormalizeCS theme={theme}>
    <NotificationsProvider position="top-center" limit={3}>
      <ModalsProvider modals={{}} modalProps={modalProps}>
        <BrowserRouter>
          <HelmetProvider>
            <App />
          </HelmetProvider>
        </BrowserRouter>
      </ModalsProvider>
    </NotificationsProvider>
  </MantineProvider>,
);
