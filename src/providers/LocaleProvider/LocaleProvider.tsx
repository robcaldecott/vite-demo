import { createContext, ReactNode, useContext, useMemo, useState } from "react";
import { IntlProvider } from "react-intl";
import frFR from "@/locales/fr-FR.json";

interface LocaleProviderData {
  locale: string;
  setLocale: (locale: string) => void;
}

const LocaleContext = createContext<LocaleProviderData | undefined>(undefined);

interface LocaleProviderProps {
  children: ReactNode;
}

export function LocaleProvider(props: LocaleProviderProps) {
  const [locale, setLocale] = useState("en-GB");

  const messages = useMemo(() => {
    switch (locale) {
      case "fr-FR":
        return frFR;
      default:
        return undefined;
    }
  }, [locale]);

  return (
    <IntlProvider locale={locale} defaultLocale="en-GB" messages={messages}>
      <LocaleContext.Provider value={{ locale, setLocale }}>
        {props.children}
      </LocaleContext.Provider>
    </IntlProvider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (context === undefined) {
    throw new Error("useLocale must be used within a LocaleProvider");
  }
  return context;
}
