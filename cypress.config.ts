import { defineConfig } from "cypress";
import customViteConfig from "./vite.config";

export default defineConfig({
  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
      viteConfig: customViteConfig,
    },
  },

  e2e: {
    setupNodeEvents() {
      // implement node event listeners here
    },
  },
  retries: {
    runMode: 2,
    openMode: 2,
  }
});
