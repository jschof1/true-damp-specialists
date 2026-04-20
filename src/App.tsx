import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import ChatWidget from "./components/ChatWidget";

// Import pages directly for SSR
import Index from "./pages/Index";
import AreaPage from "./pages/AreaPage";
import LocationsPage from "./pages/LocationsPage";
import ServicesPage from "./pages/ServicesPage";
import ServiceDetailPage from "./pages/ServiceDetailPage";
import GetQuotePage from "./pages/GetQuotePage";
import ReviewsPage from "./pages/ReviewsPage";
import FeedbackPage from "./pages/FeedbackPage";
import DiscountPage from "./pages/DiscountPage";
import FAQPage from "./pages/FAQPage";
import ContactPage from "./pages/ContactPage";
import AddCustomerPage from "./pages/AddCustomerPage";
import MarketingFormPage from "./pages/MarketingFormPage";
import BlogPage from "./pages/BlogPage";
import BlogPostPage from "./pages/BlogPostPage";
import PortfolioPage from "./pages/PortfolioPage";
import AboutPage from "./pages/AboutPage";
import NotFound from "./pages/NotFound";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <TooltipProvider>
      <ChatWidget />
      <Toaster />
      <Sonner />
      <ScrollToTop />
      {children}
    </TooltipProvider>
  );
}

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/services" element={<ServicesPage />} />
      <Route path="/services/:serviceSlug" element={<ServiceDetailPage />} />
      <Route path="/locations" element={<LocationsPage />} />
      <Route path="/locations/:areaSlug" element={<AreaPage />} />
      <Route path="/get-quote" element={<GetQuotePage />} />
      <Route path="/reviews" element={<ReviewsPage />} />
      <Route path="/feedback" element={<FeedbackPage />} />
      <Route path="/discount" element={<DiscountPage />} />
      <Route path="/faq" element={<FAQPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/add-customer" element={<AddCustomerPage />} />
      <Route path="/marketing-form" element={<MarketingFormPage />} />
      {/* <Route path="/blog" element={<BlogPage />} />
      <Route path="/blog/:slug" element={<BlogPostPage />} /> */}
      <Route path="/portfolio" element={<PortfolioPage />} />
      <Route path="/about" element={<AboutPage />} />
      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

const App = () => (
  <AppShell>
    <AppRoutes />
  </AppShell>
);

export default App;
