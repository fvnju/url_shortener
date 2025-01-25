import build from "@hono/vite-build/cloudflare-workers";
import devServer from "@hono/vite-dev-server";
import cloudflareAdapter from "@hono/vite-dev-server/cloudflare";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import autoprefixer from "autoprefixer";

const port = Number(process.env.VITE_PORT);

export default defineConfig(({ mode }) => {
  if (mode === "client") {
    return {
      plugins: [tailwindcss()],
      build: {
        rollupOptions: {
          input: "./src/client/index.tsx",
          output: {
            entryFileNames: "assets/[name].js", // For JS files
            // Customize the CSS file name here
            assetFileNames: (assetInfo) => {
              if (assetInfo.name!.endsWith(".css")) {
                return "assets/[name].css"; // Example: assets/tailwind.abc123.css
              }
              return "assets/[name].[ext]"; // For other assets
            },
          },
        },
        outDir: "./public",
      },
    };
  }

  const entry = "./src/index.ts";
  return {
    server: { port: port || 8000 },
    plugins: [
      devServer({ adapter: cloudflareAdapter, entry }),
      build({ entry }),
      tailwindcss(),
    ],
  };
});
