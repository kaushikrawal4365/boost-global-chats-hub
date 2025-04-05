
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import LanguageSelector from "@/components/LanguageSelector";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Navbar: React.FC = () => {
  const { t } = useLanguage();
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Navigation items
  const navItems = [
    { label: t("nav.home"), href: "/" },
    { label: t("nav.pricing"), href: "/pricing" },
    { label: t("nav.integration"), href: "/integration" },
    { label: t("nav.about"), href: "/about" },
    { label: t("nav.contact"), href: "/contact" },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <nav className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <span className="text-xl font-bold text-primary">
            Chat<span className="text-black">Boost</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location.pathname === item.href
                  ? "text-primary"
                  : "text-foreground"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Desktop Auth Controls */}
        <div className="hidden md:flex items-center space-x-4">
          <LanguageSelector />

          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
              <Link to="/dashboard">
                <Button variant="outline">{t("nav.dashboard")}</Button>
              </Link>
              <Button onClick={logout} variant="ghost">
                {t("nav.logout")}
              </Button>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link to="/login">
                <Button variant="outline">{t("nav.login")}</Button>
              </Link>
              <Link to="/signup">
                <Button variant="default">{t("nav.signup")}</Button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="sm"
          className="md:hidden"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </Button>
      </nav>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white p-4 shadow-lg animate-fade-in">
          <div className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`text-sm font-medium p-2 rounded-md transition-colors hover:bg-slate-100 ${
                  location.pathname === item.href
                    ? "text-primary bg-slate-50"
                    : "text-foreground"
                }`}
                onClick={closeMenu}
              >
                {item.label}
              </Link>
            ))}

            {/* Language Selector */}
            <div className="py-2">
              <LanguageSelector />
            </div>

            {/* Auth Controls */}
            <div className="pt-2 space-y-2 border-t border-slate-200">
              {isAuthenticated ? (
                <>
                  <Link to="/dashboard" onClick={closeMenu}>
                    <Button className="w-full">{t("nav.dashboard")}</Button>
                  </Link>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      logout();
                      closeMenu();
                    }}
                  >
                    {t("nav.logout")}
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={closeMenu}>
                    <Button variant="outline" className="w-full">
                      {t("nav.login")}
                    </Button>
                  </Link>
                  <Link to="/signup" onClick={closeMenu}>
                    <Button className="w-full">{t("nav.signup")}</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
