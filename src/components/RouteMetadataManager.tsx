import { useLocation } from "react-router-dom";
import { routes } from "@/routes";
import { Helmet } from "react-helmet-async";

const RouteMetadataManager = () => {
  const { pathname } = useLocation();

  // Find matching route
  const currentRoute = routes.find(r => r.path === pathname) || 
                      routes.find(r => pathname.startsWith(r.path) && r.path !== "/");

  if (!currentRoute) return null;

  return (
    <Helmet key={pathname}>
      <title>{currentRoute.title}</title>
      <meta name="description" content={currentRoute.description} />
      {currentRoute.noindex && <meta name="robots" content="noindex, nofollow" />}
    </Helmet>
  );
};

export default RouteMetadataManager;
