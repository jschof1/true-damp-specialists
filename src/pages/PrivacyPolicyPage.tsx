import Footer from "@/components/Footer";
import Header from "@/components/Header";
import SEO from "@/components/SEO";
import { siteSettings } from "@/data/siteSettings";

const PrivacyPolicyPage = () => (
  <div className="min-h-screen bg-background">
    <SEO
      title={`Privacy policy | ${siteSettings.businessName}`}
      description="How True Damp Specialists handles website enquiries and optional website tools."
      path="/privacy-policy"
      breadcrumbs={[
        { name: "Home", path: "/" },
        { name: "Privacy policy", path: "/privacy-policy" },
      ]}
    />
    <Header />
    <main id="main-content" className="container mx-auto max-w-4xl px-4 py-14 md:py-20">
      <p className="font-display text-sm font-bold uppercase tracking-[0.18em] text-accent">
        Privacy
      </p>
      <h1 className="mt-3 font-display text-4xl font-bold text-foreground md:text-5xl">
        Privacy policy
      </h1>
      <div className="mt-10 space-y-8 text-base leading-relaxed text-muted-foreground">
        <section>
          <h2 className="font-display text-2xl font-bold text-foreground">Information submitted to us</h2>
          <p className="mt-3">
            When you contact True Damp Specialists or request a quote, the information you provide is used to respond to your enquiry, arrange an assessment, prepare a quote, and manage the requested service. Do not include sensitive personal information in website forms unless it is necessary for your enquiry.
          </p>
        </section>
        <section>
          <h2 className="font-display text-2xl font-bold text-foreground">Optional website measurement</h2>
          <p className="mt-3">
            If you choose to allow optional website tools, Plausible is loaded to provide aggregate website measurement. It is not loaded before that choice. Form responses, report contents and free-text enquiry messages are not sent to Plausible as analytics events.
          </p>
        </section>
        <section>
          <h2 className="font-display text-2xl font-bold text-foreground">Optional chat</h2>
          <p className="mt-3">
            If you choose to allow optional website tools, LeadConnector chat is loaded so you can start a conversation through the website. The provider may use its own cookies or similar technologies to provide that service.
          </p>
        </section>
        <section>
          <h2 className="font-display text-2xl font-bold text-foreground">Your choices</h2>
          <p className="mt-3">
            Optional tools are off by default. You can change your choice at any time using the optional tools preferences link in the footer. To ask about information submitted through the website, contact True Damp Specialists using the details on the contact page.
          </p>
        </section>
      </div>
    </main>
    <Footer />
  </div>
);

export default PrivacyPolicyPage;
