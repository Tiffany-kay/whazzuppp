import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Production build is served from https://tiffany-kay.github.io/whazzuppp/
// so assets need to resolve under that sub-path. Dev still runs at /.
export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === "build" ? "/whazzuppp/" : "/",
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
}));
