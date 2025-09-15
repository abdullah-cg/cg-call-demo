import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true, // allows access from external IPs
    allowedHosts: ["summit.cleargrid.ae"], // add your domain
    port: 5173, // or whatever you're using
  },
});
