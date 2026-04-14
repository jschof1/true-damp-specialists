import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { HelmetProvider } from "react-helmet-async";
import type { HelmetServerState } from "react-helmet-async";
import { AppShell, AppRoutes } from "./App";

export function render(url: string) {
  const helmetContext: { helmet?: HelmetServerState } = {};
  const html = renderToString(
    <HelmetProvider context={helmetContext}>
      <StaticRouter location={url}>
        <AppShell>
          <AppRoutes />
        </AppShell>
      </StaticRouter>
    </HelmetProvider>
  );
  
  // helmetContext.helmet is populated after renderToString
  const { helmet } = helmetContext;
  
  return { html, helmet };
}
