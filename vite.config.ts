/// <reference types="vitest" />
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: ["formatjs"],
      },
    }),
    tsconfigPaths(),
  ],
  server: {
    open: true,
  },
  test: {
    environment: "jsdom",
    setupFiles: "setupTests.ts",
  },
});
