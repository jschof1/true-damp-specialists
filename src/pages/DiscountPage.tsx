import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import {
  CheckCircle,
  Percent,
  ShieldCheck,
  Star,
  Zap,
  ChevronRight,
} from "lucide-react";
import { siteSettings } from "@/data/siteSettings";
import { formEndpoints, postFormSubmission } from "@/lib/formApi";
import { normalizeUKPhone } from "@/lib/phoneUtils";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import theme from "@/config/theme";
import { cn } from "@/lib/utils";

const benefits = [
  { icon: Percent, text: "£100 off your transformation when referred" },
  { icon: Star, text: "£100 cash for you when you refer a friend" },
  { icon: Zap, text: "Premium materials & expert craftsmanship" },
];

const DiscountPage = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    summary: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.phone.trim() ||
      !formData.summary.trim()
    ) {
      toast({
        title: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await postFormSubmission(formEndpoints.discount, {
        name: formData.name.trim(),
        phone: normalizeUKPhone(formData.phone.trim()),
        summary: formData.summary.trim(),
        source: "discount-page",
        timestamp: new Date().toISOString(),
      });

      setIsSubmitted(true);
      toast({
        title: "Request submitted!",
        description: "We'll be in touch soon with your discount.",
      });
    } catch (error) {
      console.error("Submission error:", error);
      toast({
        title: "Submission failed",
        description: "Please try again or Call Now directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <>
        <Header />
        <div
          className="min-h-[80vh] flex items-center justify-center p-6"
          style={{ backgroundColor: theme.surfaces.background }}
        >
          <div
            className="text-center max-w-lg mx-auto p-8 md:p-12 rounded-2xl border-2"
            style={{
              backgroundColor: theme.surfaces.card,
              borderColor: theme.colors.accent.DEFAULT,
              boxShadow: theme.effects.shadows.accentGlow,
            }}
          >
            <div
              className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-6"
              style={{
                backgroundColor: theme.colors.accent[100],
                border: `3px solid ${theme.colors.accent.DEFAULT}`,
              }}
            >
              <CheckCircle
                className="w-10 h-10"
                style={{ color: theme.colors.accent[600] }}
                strokeWidth={2.5}
              />
            </div>
            <h1
              className="font-display font-bold text-3xl mb-3"
              style={{ color: theme.surfaces.foreground }}
            >
              Thank You!
            </h1>
            <p
              className="text-lg mb-8"
              style={{ color: theme.surfaces.mutedForeground }}
            >
              We've received your request and will contact you shortly with your
              exclusive discount.
            </p>
            <Button asChild variant="outline" size="lg" className="border-2">
              <Link to="/">Back to Home</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
        <title>Exclusive Discount | {siteSettings.businessName}</title>
      </Helmet>

      <Header />

      <main
        className="relative overflow-hidden min-h-[80vh] flex items-center py-12 md:py-20"
        style={{ backgroundColor: theme.surfaces.background }}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            {/* Form card */}
            <div
              className="rounded-2xl border-2 p-6 md:p-10 shadow-xl relative overflow-hidden mb-8"
              style={{
                backgroundColor: theme.surfaces.card,
                borderColor: theme.colors.primary[300],
                boxShadow: theme.effects.shadows.xl,
              }}
            >
              {/* Accent corner */}
              <div
                className="absolute top-0 right-0 w-32 h-32 -translate-y-1/2 translate-x-1/2 rounded-full opacity-10"
                style={{
                  backgroundColor: theme.colors.accent.DEFAULT,
                }}
              />

              <div className="relative text-center mb-8">
                <div
                  className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6"
                  style={{
                    backgroundColor: theme.colors.accent[100],
                    border: `2px solid ${theme.colors.accent.DEFAULT.replace(")", " / 0.5)")}`,
                  }}
                >
                  <Percent
                    className="w-8 h-8"
                    style={{ color: theme.colors.accent[600] }}
                    strokeWidth={2.5}
                  />
                </div>
                <h1
                  className="font-display font-black text-3xl md:text-4xl mb-3"
                  style={{ color: theme.surfaces.foreground }}
                >
                  Claim Your Exclusive Discount
                </h1>
                <p
                  className="text-lg max-w-md mx-auto"
                  style={{ color: theme.surfaces.mutedForeground }}
                >
                  Fill in your details and we'll call you with your
                  exclusive offer.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5 text-left">
                <div className="space-y-2">
                  <Label
                    htmlFor="name"
                    className="font-semibold"
                    style={{ color: theme.surfaces.foreground }}
                  >
                    Name
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Your full name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="h-12 border-2 border-border focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-0"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="phone"
                    className="font-semibold"
                    style={{ color: theme.surfaces.foreground }}
                  >
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Your phone number"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="h-12 border-2 border-border focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-0"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="summary"
                    className="font-semibold"
                    style={{ color: theme.surfaces.foreground }}
                  >
                    What do you need help with?
                  </Label>
                  <Textarea
                    id="summary"
                    placeholder="e.g. Damp survey, mould issue, basement waterproofing..."
                    value={formData.summary}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        summary: e.target.value,
                      })
                    }
                    rows={4}
                    className="resize-none border-2 border-border focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-0"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className={cn(
                    "w-full h-14 text-lg font-bold transition-all hover:scale-[1.02] active:scale-[0.98] mt-4"
                  )}
                  style={{
                    background: theme.brand?.goldGradient ?? theme.colors.accent.DEFAULT,
                    color: theme.surfaces.accentForeground,
                    boxShadow: theme.effects.shadows.accent,
                  }}
                >
                  {isSubmitting ? (
                    "Submitting..."
                  ) : (
                    <>
                      Claim My Discount
                      <ChevronRight className="w-5 h-5 ml-2" strokeWidth={3} />
                    </>
                  )}
                </Button>
              </form>

              <p
                className="text-center text-xs mt-6 flex items-center justify-center gap-2"
                style={{ color: theme.surfaces.mutedForeground }}
              >
                <ShieldCheck className="w-4 h-4" />
                Your details are secure and never shared
              </p>
            </div>

            {/* Conversion Signals */}
            <div className="grid sm:grid-cols-3 gap-4">
              {benefits.map((item, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center text-center p-4 rounded-xl border bg-card/50"
                  style={{
                    borderColor: theme.colors.primary[200],
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center mb-3"
                    style={{
                      backgroundColor: theme.colors.accent[100],
                      color: theme.colors.accent[600],
                    }}
                  >
                    <item.icon className="w-5 h-5" strokeWidth={2.5} />
                  </div>
                  <span
                    className="text-sm font-medium leading-tight"
                    style={{ color: theme.surfaces.foreground }}
                  >
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default DiscountPage;
