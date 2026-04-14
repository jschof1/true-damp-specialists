import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AppShell, AppRoutes } from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <HelmetProvider>
      <AppShell>
        <AppRoutes />
      </AppShell>
    </HelmetProvider>
  </BrowserRouter>
);

