import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { NotificationsProvider } from "@mantine/notifications";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { createRoot } from "react-dom/client";
import { Provider, connect } from "react-redux";
import store from "./config/store";

import "./styles/main.css";
import { modalProps } from "./utils/modalProps";
import { theme } from "./styles/theme";
import App from "./App";
import Root from "./routes/Root";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <MantineProvider withGlobalStyles withNormalizeCS theme={theme}>
      <NotificationsProvider position="bottom-right" limit={4}>
        <ModalsProvider modals={{}} modalProps={modalProps}>
          <BrowserRouter>
            <HelmetProvider>
              <Root />
            </HelmetProvider>
          </BrowserRouter>
        </ModalsProvider>
      </NotificationsProvider>
    </MantineProvider>
  </Provider>,
);
