import React from "react";
import ReactDOM from "react-dom";
import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { NotificationsProvider } from "@mantine/notifications";
import { ReactQueryDevtools } from "react-query/devtools";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";

import "./styles/main.css";
import { modalProps } from "./utils/modalProps";
import { theme } from "./styles/theme";
import App from "./ArjApp";

const queryClient = new QueryClient();

ReactDOM.render(
  <MantineProvider withGlobalStyles withNormalizeCS theme={theme}>
    <NotificationsProvider position="top-center" limit={3}>
      <QueryClientProvider client={queryClient}>
        <ModalsProvider modals={{}} modalProps={modalProps}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ModalsProvider>
        {/* <ReactQueryDevtools initialIsOpen={false} position="bottom-right" /> */}
      </QueryClientProvider>
    </NotificationsProvider>
  </MantineProvider>,
  document.getElementById("root"),
);
