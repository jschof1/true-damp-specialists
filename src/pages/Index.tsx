import SEO from "@/components/SEO";
import SkipToContent from "@/components/SkipToContent";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ReviewShowcase from "@/components/ReviewShowcase";
import ServicesGrid from "@/components/ServicesGrid";
import WhyChooseUs from "@/components/WhyChooseUs";
import ProjectGallery from "@/components/ProjectGallery";
import ServiceAreas from "@/components/ServiceAreas";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import MobileCallButton from "@/components/MobileCallButton";
import { siteSettings } from "@/data/siteSettings";
import { getSiteContent } from "@/data/content";

const Index = () => {
  const site = getSiteContent();
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: (siteSettings.standardFaqs || []).map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <div className="min-h-screen overflow-x-clip">
      <SEO
        title={`Independent Damp Surveys | ${site.name}`}
        description={site.description}
        path="/"
        image={siteSettings.primaryImagePath}
        breadcrumbs={[{ name: "Home", path: "/" }]}
        schema={faqSchema}
      />

      <SkipToContent />
      <Header />
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <ReviewShowcase />
        <WhyChooseUs />
        <ServicesGrid />
        <ProjectGallery />
        <ServiceAreas />
        <Testimonials />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
      <MobileCallButton />
    </div>
  );
};

export default Index;