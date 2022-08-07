import React from "react";
import ReactDOM from "react-dom";
import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { NotificationsProvider } from "@mantine/notifications";
import { ReactQueryDevtools } from "react-query/devtools";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";

import "./styles.css";
import AddTaskModal from "./components/modals/addTaskModal/AddTaskModal";
import { UserProvider } from "./UserContext";
import { modalProps } from "./utils/modalProps";
import { theme } from "./utils/theme";
import App from "./ArjApp";

const queryClient = new QueryClient();

ReactDOM.render(
  <MantineProvider withGlobalStyles withNormalizeCS theme={theme}>
    <NotificationsProvider position="top-center" limit={3}>
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <ModalsProvider
            modals={{ addTaskModal: AddTaskModal }}
            modalProps={modalProps}
          >
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </ModalsProvider>
        </UserProvider>
        {/* <ReactQueryDevtools initialIsOpen={false} position="bottom-right" /> */}
      </QueryClientProvider>
    </NotificationsProvider>
  </MantineProvider>,
  document.getElementById("root"),
);
