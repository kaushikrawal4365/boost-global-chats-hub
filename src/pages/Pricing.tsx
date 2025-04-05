
import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCurrency } from "@/contexts/CurrencyContext";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import CurrencySelector from "@/components/CurrencySelector";

const Pricing: React.FC = () => {
  const { t } = useLanguage();
  const { convertPrice, currencySymbol } = useCurrency();

  const plans = [
    {
      id: "free",
      name: t("pricing.free.title"),
      priceUSD: 0,
      period: t("pricing.free.period"),
      features: [
        t("pricing.free.feature1"),
        t("pricing.free.feature2"),
        t("pricing.free.feature3"),
      ],
      cta: t("pricing.free.cta"),
      ctaLink: "/signup",
      popular: false,
    },
    {
      id: "individual",
      name: t("pricing.individual.title"),
      priceUSD: 2,
      period: t("pricing.individual.period"),
      features: [
        t("pricing.individual.feature1"),
        t("pricing.individual.feature2"),
        t("pricing.individual.feature3"),
      ],
      cta: t("pricing.individual.cta"),
      ctaLink: "/signup",
      popular: true,
    },
    {
      id: "group",
      name: t("pricing.group.title"),
      priceUSD: 15,
      period: t("pricing.group.period"),
      features: [
        t("pricing.group.feature1"),
        t("pricing.group.feature2"),
        t("pricing.group.feature3"),
      ],
      cta: t("pricing.group.cta"),
      ctaLink: "/signup",
      popular: false,
    },
    {
      id: "lifetime",
      name: t("pricing.lifetime.title"),
      priceUSD: 75,
      period: t("pricing.lifetime.period"),
      features: [
        t("pricing.lifetime.feature1"),
        t("pricing.lifetime.feature2"),
        t("pricing.lifetime.feature3"),
      ],
      cta: t("pricing.lifetime.cta"),
      ctaLink: "/signup",
      popular: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Pricing Header */}
      <div className="bg-white pt-16 pb-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {t("pricing.title")}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            {t("pricing.subtitle")}
          </p>

          {/* Currency Selector */}
          <div className="flex justify-center mb-8">
            <CurrencySelector />
          </div>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:shadow-lg ${
                plan.popular ? "border-2 border-primary transform md:-translate-y-2" : ""
              }`}
            >
              {plan.popular && (
                <div className="bg-primary text-white py-1 px-4 text-center text-sm font-medium">
                  Most Popular
                </div>
              )}

              <div className="p-6">
                <h2 className="text-xl font-bold mb-2">{plan.name}</h2>
                <div className="mb-4 flex items-baseline">
                  <span className="text-4xl font-bold">
                    {currencySymbol}{convertPrice(plan.priceUSD)}
                  </span>
                  <span className="text-gray-600 ml-1">{plan.period}</span>
                </div>

                <ul className="mb-6 space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link to={plan.ctaLink}>
                  <Button
                    className={`w-full ${
                      plan.popular ? "" : "bg-white hover:bg-gray-50 text-primary border border-primary"
                    }`}
                    variant={plan.popular ? "default" : "outline"}
                  >
                    {plan.cta}
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">
          Frequently Asked Questions
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-medium mb-3">Can I switch plans later?</h3>
            <p className="text-gray-600">
              Yes, you can upgrade or downgrade your plan at any time. Changes will be applied at the start of your next billing cycle.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-medium mb-3">What payment methods do you accept?</h3>
            <p className="text-gray-600">
              We accept all major credit cards, PayPal, and bank transfers for annual plans.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-medium mb-3">Is there a refund policy?</h3>
            <p className="text-gray-600">
              We offer a 14-day money-back guarantee for all paid plans. If you're not satisfied, contact us for a full refund.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-medium mb-3">What happens if I exceed my message limit?</h3>
            <p className="text-gray-600">
              If you reach your daily message limit, you'll need to wait until the next day or upgrade to a higher plan for immediate access.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Banner */}
      <div className="bg-primary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to get started with ChatBoost?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-blue-100">
            Join thousands of users who are already using our AI chatbots.
          </p>
          <Link to="/signup">
            <Button size="lg" className="bg-white text-primary hover:bg-blue-50">
              Sign Up Now
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
