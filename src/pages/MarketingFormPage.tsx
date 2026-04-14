import { Helmet } from "react-helmet-async";
import { Star, Smartphone, CheckCircle2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardHeader } from "@/components/ui/card";
import { siteSettings } from "@/data/siteSettings";
import { cn } from "@/lib/utils";

const MarketingFormPage = () => {
  const steps = [
    {
      icon: Star,
      title: "5-star review funnel",
      description:
        "Your customer will be reminded to leave a 5-star review up to 4 times over 4 weeks. This helps capture positive feedback and reduces the chance of negative reviews going public.",
      note: "Automation stops automatically once they leave a review.",
    },
    {
      icon: Smartphone,
      title: "1-year follow-up sequence",
      description:
        "Your customer enters a 12-month text sequence. Every 2–3 months they'll receive a reminder about your return customer discount and a request for referrals — with the same discount offered to friends and family.",
    },
  ];

  return (
    <>
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
        <title>Customer Added to Pipeline | {siteSettings.businessName}</title>
      </Helmet>

      <Header />

      <main className="min-h-screen bg-background">
        <section className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-2xl mx-auto">
            {/* Success header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
                <CheckCircle2 className="w-8 h-8 text-primary" />
              </div>
              <h1 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-4">
                Customer added to pipeline
              </h1>
              <p className="text-lg text-muted-foreground">
                You've submitted the form. Here's what happens next:
              </p>
            </div>

            {/* Steps */}
            <div className="space-y-6">
              {steps.map((step, index) => (
                <Card
                  key={index}
                  className={cn(
                    "border-border bg-card overflow-hidden",
                    "transition-shadow hover:shadow-md"
                  )}
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                        <step.icon className="w-6 h-6 text-accent" />
                      </div>
                      <div>
                        <h2 className="font-display font-bold text-xl text-foreground">
                          {index + 1}. {step.title}
                        </h2>
                        <p className="text-muted-foreground mt-1 leading-relaxed">
                          {step.description}
                        </p>
                        {step.note && (
                          <p className="text-sm text-muted-foreground mt-3 italic">
                            {step.note}
                          </p>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default MarketingFormPage;
