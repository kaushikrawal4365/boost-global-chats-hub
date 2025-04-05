
import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Twitter, Facebook, Linkedin, Github } from "lucide-react";

const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-gray-50 py-12 border-t border-gray-200">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center mb-4">
              <span className="text-xl font-bold text-primary">
                Chat<span className="text-black">Boost</span>
              </span>
            </Link>
            <p className="text-gray-600 max-w-md">
              Access 50+ AI-powered chatbots for your business. Integrate smart
              chatbots into your applications for motivation, productivity,
              learning, customer support, and more.
            </p>

            {/* Social Media Links */}
            <div className="flex space-x-4 mt-6">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary"
              >
                <Twitter size={20} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary"
              >
                <Github size={20} />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-medium text-lg mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/about"
                  className="text-gray-600 hover:text-primary transition-colors"
                >
                  {t("nav.about")}
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-600 hover:text-primary transition-colors"
                >
                  {t("nav.contact")}
                </Link>
              </li>
              <li>
                <Link
                  to="/pricing"
                  className="text-gray-600 hover:text-primary transition-colors"
                >
                  {t("nav.pricing")}
                </Link>
              </li>
              <li>
                <Link
                  to="/feedback"
                  className="text-gray-600 hover:text-primary transition-colors"
                >
                  Feedback
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-medium text-lg mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/terms"
                  className="text-gray-600 hover:text-primary transition-colors"
                >
                  {t("footer.terms")}
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="text-gray-600 hover:text-primary transition-colors"
                >
                  {t("footer.privacy")}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-200 mt-8 pt-8 text-center sm:text-left text-gray-600">
          <p>{t("footer.copyright")}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
