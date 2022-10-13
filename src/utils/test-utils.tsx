import { ReactElement, ReactNode } from "react";
import { MemoryRouter } from "react-router-dom";
import { Experimental_CssVarsProvider as CssVarsProvider } from "@mui/material";
import { render, RenderOptions } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LocaleProvider } from "@/providers/LocaleProvider";
import { theme } from "@/utils/theme";

interface ProvidersProps {
  children: ReactNode;
}

function Providers(props: ProvidersProps) {
  return (
    <CssVarsProvider theme={theme}>
      <LocaleProvider>
        <MemoryRouter>{props.children}</MemoryRouter>
      </LocaleProvider>
    </CssVarsProvider>
  );
}

function customRender(
  ui: ReactElement,
  options?: Omit<RenderOptions, "queries">
) {
  return render(ui, { wrapper: Providers, ...options });
}

export * from "@testing-library/react";

export { customRender as render, userEvent };
