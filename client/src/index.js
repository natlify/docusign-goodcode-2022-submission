import React from "react";
import ReactDOM from "react-dom";
import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { NotificationsProvider } from "@mantine/notifications";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

import "./styles/main.css";
import { modalProps } from "./utils/modalProps";
import { theme } from "./styles/theme";
import App from "./App";
import LandingPage from "./pages/LandingPage";

const queryClient = new QueryClient();

ReactDOM.render(
  <MantineProvider withGlobalStyles withNormalizeCS theme={theme}>
    <NotificationsProvider position="top-center" limit={3}>
      <QueryClientProvider client={queryClient}>
        <ModalsProvider modals={{}} modalProps={modalProps}>
          <BrowserRouter>
            <HelmetProvider>
              <App />
            </HelmetProvider>
          </BrowserRouter>
        </ModalsProvider>
      </QueryClientProvider>
    </NotificationsProvider>
  </MantineProvider>,
  document.getElementById("root"),
);
