import matchers from "@testing-library/jest-dom/matchers";
import { cleanup } from "@testing-library/react";
import mediaQuery from "css-mediaquery";
import { afterEach, expect, vi } from "vitest";

expect.extend(matchers);

afterEach(cleanup);

const createMatchMedia =
  (width: number) =>
  // @ts-ignore
  (query: string): MediaQueryList => ({
    matches: mediaQuery.match(query, { width }),
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  });

window.matchMedia = createMatchMedia(window.innerWidth);
