import { defineConfig } from "vite";
import Vue from "@vitejs/plugin-vue";
const path = require("path");

export default defineConfig({
  plugins: [Vue()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "~": path.resolve(__dirname, "./"),
    },
  },
  test: {
    globals: true,
    environment: "happy-dom",
  },
});
