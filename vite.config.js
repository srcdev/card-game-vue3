// // vite.config.js
import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
const path = require("path");

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  const vueDevTools = process.env.VITE_APP_DEV_TOOLS_ENABLED;
  console.log(`vueDevTools --> ${vueDevTools}`);

  return defineConfig({
    plugins: [vue()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        "~": path.resolve(__dirname, "./"),
      },
    },
    build: {
      outDir: path.resolve(__dirname, "dist"), // This is the local filesystem location to drop files
      rollupOptions: {
        input: {
          index: path.resolve(__dirname, "index.html"),
        },
      },
    },
    server: {
      port: process.env.VITE_PORT,
    },
    config: {
      devtools: process.env.VITE_APP_DEV_TOOLS_ENABLED,
    },
  });
};
