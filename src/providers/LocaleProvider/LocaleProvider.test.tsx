import { expect, it } from "vitest";
import { render, screen, userEvent } from "@/utils/test-utils";
import { LocaleProvider, useLocale } from ".";

function Component() {
  const { locale, setLocale } = useLocale();
  return (
    <>
      <div>{locale}</div>
      <button
        onClick={() => {
          setLocale("fr-FR");
        }}
      >
        French
      </button>
    </>
  );
}

it("renders", async () => {
  render(
    <LocaleProvider>
      <Component />
    </LocaleProvider>
  );
  expect(screen.getByText("en-GB"));
  await userEvent.click(screen.getByRole("button"));
  expect(screen.getByText("fr-FR"));
});
