
import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { MessageSquare, Zap, Globe, Bot } from "lucide-react";

const Home: React.FC = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: <MessageSquare className="w-10 h-10 text-primary" />,
      title: t("features.affordable.title"),
      description: t("features.affordable.description"),
    },
    {
      icon: <Zap className="w-10 h-10 text-primary" />,
      title: t("features.integration.title"),
      description: t("features.integration.description"),
    },
    {
      icon: <Globe className="w-10 h-10 text-primary" />,
      title: t("features.international.title"),
      description: t("features.international.description"),
    },
  ];

  const chatbots = [
    {
      name: "Motivation Coach",
      description: "Daily motivation and personalized coaching",
      icon: <Bot className="w-6 h-6 text-white" />,
      color: "bg-blue-500",
    },
    {
      name: "Productivity Assistant",
      description: "Task management and productivity tips",
      icon: <Bot className="w-6 h-6 text-white" />,
      color: "bg-green-500",
    },
    {
      name: "Language Tutor",
      description: "Learn new languages with interactive lessons",
      icon: <Bot className="w-6 h-6 text-white" />,
      color: "bg-purple-500",
    },
    {
      name: "Customer Support",
      description: "24/7 automated support for your customers",
      icon: <Bot className="w-6 h-6 text-white" />,
      color: "bg-red-500",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient text-white py-20">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
          {/* Hero Text */}
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight animate-slide-in">
              {t("hero.title")}
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-lg">
              {t("hero.subtitle")}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/signup">
                <Button size="lg" className="bg-white text-primary hover:bg-blue-50">
                  {t("hero.cta")}
                </Button>
              </Link>
              <Link to="/about">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  {t("hero.secondaryCta")}
                </Button>
              </Link>
            </div>
          </div>

          {/* Hero Image */}
          <div className="md:w-1/2 flex justify-center">
            <div className="relative w-full max-w-lg">
              {/* Chat bubbles illustration */}
              <div className="bg-white p-5 rounded-lg shadow-lg mb-6 transform -rotate-2">
                <p className="text-gray-800 font-medium">How can I improve my team's productivity?</p>
                <div className="flex justify-end">
                  <span className="text-xs text-gray-500">You</span>
                </div>
              </div>
              <div className="bg-blue-50 p-5 rounded-lg shadow-lg ml-10">
                <p className="text-gray-800">I suggest implementing a daily stand-up meeting and using the Pomodoro technique. Would you like me to explain how?</p>
                <div className="flex justify-end">
                  <span className="text-xs text-gray-500">Productivity Bot</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            {t("features.title")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {features.map((feature, index) => (
              <div
                key={index}
                className="feature-card transform transition-all hover:scale-105"
              >
                <div className="flex justify-center mb-6">{feature.icon}</div>
                <h3 className="text-xl font-bold text-center mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-center">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Chatbots Preview */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
            Popular Chatbots
          </h2>
          <p className="text-xl text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Choose from our collection of 50+ specialized chatbots designed for different needs
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {chatbots.map((bot, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className={`${bot.color} p-4 flex items-center justify-center`}>
                  <div className="rounded-full bg-white/20 p-3">
                    {bot.icon}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-lg mb-2">{bot.name}</h3>
                  <p className="text-sm text-gray-600">{bot.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/signup">
              <Button size="lg">
                Get Started with 50+ Chatbots
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to boost your communication?
          </h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto text-blue-100">
            Join thousands of users who trust ChatBoost for their AI chatbot needs.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/signup">
              <Button size="lg" className="bg-white text-primary hover:bg-blue-50">
                Sign Up Now
              </Button>
            </Link>
            <Link to="/integration">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 bg-white/20">
                Learn About Integration
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer links */}
      <section className="py-6 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
            <Link to="/terms" className="hover:text-primary hover:underline">Terms of Service</Link>
            <Link to="/privacy" className="hover:text-primary hover:underline">Privacy Policy</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
