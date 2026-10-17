import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],

  server: {
    host: "127.0.0.1",
    port: 4173,

    proxy: {
      "/api": {
        target: "https://api-uat.vinhomes.biz.vn",
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api/, "/hovixi/api/v1"),
      },
    },
  },
});
