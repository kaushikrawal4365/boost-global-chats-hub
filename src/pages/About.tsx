
import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Globe, Users, Zap } from "lucide-react";

const About: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white pt-16 pb-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">{t("about.title")}</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Empowering businesses and individuals with affordable AI chatbot solutions
          </p>
        </div>
      </div>

      {/* Mission and Vision */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="flex items-center mb-6">
              <div className="bg-primary/10 p-3 rounded-full">
                <Globe className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-2xl font-bold ml-4">{t("about.mission.title")}</h2>
            </div>
            <p className="text-gray-600 mb-6">
              {t("about.mission.description")} We believe that AI chatbots should not be limited to large enterprises with big budgets. Our mission is to democratize access to advanced AI technology by providing affordable, easy-to-implement chatbot solutions for businesses and individuals of all sizes.
            </p>
            <p className="text-gray-600">
              Through our platform, we aim to help our customers enhance their productivity, improve customer support, facilitate learning, and more – all through the power of conversational AI that's accessible to everyone.
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="flex items-center mb-6">
              <div className="bg-primary/10 p-3 rounded-full">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-2xl font-bold ml-4">{t("about.vision.title")}</h2>
            </div>
            <p className="text-gray-600 mb-6">
              {t("about.vision.description")} We envision a future where AI chatbots are as common as websites, seamlessly integrated into digital experiences across education, business, and personal use.
            </p>
            <p className="text-gray-600">
              Our vision extends beyond just providing tools – we aim to create an ecosystem where AI chatbots can be easily customized, deployed, and managed by anyone, regardless of their technical expertise, fostering innovation and improving communication worldwide.
            </p>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-primary/10 p-3 rounded-full">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-3xl font-bold ml-4">{t("about.team.title")}</h2>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Meet the passionate people behind ChatBoost who are dedicated to making advanced AI chatbots accessible to everyone.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* Founder */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-48 bg-gray-200 flex items-center justify-center">
              <svg className="h-24 w-24 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <div className="p-6">
              <h3 className="font-bold text-lg mb-1">CEO & Founder</h3>
              <p className="text-gray-600 text-sm mb-3">
                A tech entrepreneur with a passion for making AI accessible to everyone. With over 15 years of experience in software development and artificial intelligence.
              </p>
            </div>
          </div>

          {/* CTO */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-48 bg-gray-200 flex items-center justify-center">
              <svg className="h-24 w-24 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <div className="p-6">
              <h3 className="font-bold text-lg mb-1">CTO</h3>
              <p className="text-gray-600 text-sm mb-3">
                Leads our engineering team with expertise in machine learning and natural language processing. Previously worked at leading AI research labs.
              </p>
            </div>
          </div>

          {/* Head of Product */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-48 bg-gray-200 flex items-center justify-center">
              <svg className="h-24 w-24 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <div className="p-6">
              <h3 className="font-bold text-lg mb-1">Head of Product</h3>
              <p className="text-gray-600 text-sm mb-3">
                Oversees product development with a focus on user experience and accessibility. Has helped scale multiple SaaS products to millions of users.
              </p>
            </div>
          </div>

          {/* Head of Customer Success */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-48 bg-gray-200 flex items-center justify-center">
              <svg className="h-24 w-24 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <div className="p-6">
              <h3 className="font-bold text-lg mb-1">Head of Customer Success</h3>
              <p className="text-gray-600 text-sm mb-3">
                Ensures our customers get the most out of ChatBoost. With a background in education and customer support, dedicated to helping users succeed.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-primary text-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-white/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Accessibility</h3>
              <p className="text-blue-100">
                Making advanced AI technology accessible to everyone, regardless of technical skill or budget.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-white/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Trust & Privacy</h3>
              <p className="text-blue-100">
                Ensuring the highest standards of data privacy and security in all our products and services.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-white/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Innovation</h3>
              <p className="text-blue-100">
                Continuously pushing the boundaries of what's possible with AI chatbots to deliver more value to our users.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl font-bold mb-6">Ready to get started with ChatBoost?</h2>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Join thousands of users who are already leveraging our AI chatbots to enhance their businesses and lives.
        </p>
        <Link to="/signup">
          <Button size="lg">
            Sign Up Now
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default About;
