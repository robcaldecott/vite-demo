import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import {
  CssBaseline,
  Experimental_CssVarsProvider as CssVarsProvider,
} from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { App } from "@/App";
import { LocaleProvider } from "@/providers/LocaleProvider";
import { theme } from "@/utils/theme";

import("./mocks/browser").then(({ worker }) => {
  // Start the mock API server
  worker.start({ onUnhandledRequest: "bypass" });

  // Create the query client
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });

  // Start the app
  ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
      <CssVarsProvider theme={theme}>
        <CssBaseline />
        <LocaleProvider>
          <BrowserRouter>
            <QueryClientProvider client={queryClient}>
              <App />
              <ReactQueryDevtools />
            </QueryClientProvider>
          </BrowserRouter>
        </LocaleProvider>
      </CssVarsProvider>
    </React.StrictMode>
  );
});
