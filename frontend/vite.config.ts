import legacy from "@vitejs/plugin-legacy"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { VitePWA } from "vite-plugin-pwa"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    legacy(),
    VitePWA({
      registerType: "autoUpdate",
      manifestFilename: "manifest.json",
      manifest: {
        short_name: "RoadMate",
        name: "RoadMate",
        icons: [
          {
            src: "favicon.png",
            sizes: "64x64 32x32 24x24 16x16",
            type: "image/png",
          },
        ],
        display: "standalone",
        theme_color: "#00c49a",
        background_color: "#f0f8f9",
        lang: "de",
        orientation: "portrait",
      },
    }),
  ],
})
