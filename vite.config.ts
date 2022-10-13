/// <reference types="vitest" />
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";
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
    visualizer(),
  ],
  server: {
    open: true,
  },
  test: {
    environment: "jsdom",
    setupFiles: "setupTests.ts",
  },
});
