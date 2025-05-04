import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env vars based on mode
  const env = loadEnv(mode, process.cwd(), '');

  return {
    server: {
      host: "::",
      port: 5173,
    },
    plugins: [
      react(),
      mode === 'development' &&
      componentTagger(),
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        // Add an alias for tailwindcss/version.js to fix the compatibility issue
        "tailwindcss/version.js": path.resolve(__dirname, "./src/utils/tailwind-version-stub.js"),
      },
    },
    optimizeDeps: {
      exclude: ['tailwindcss/version.js']
    },
    // Explicitly define env vars to expose
    define: {
      'process.env': env
    }
  };
});
