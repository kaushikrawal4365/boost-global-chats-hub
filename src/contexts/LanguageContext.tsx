
import React, { createContext, useState, useContext, useEffect } from "react";

// Define the available languages
export type Language = "en" | "es" | "fr";

// Define the translation resources
interface TranslationResources {
  [key: string]: {
    [key: string]: string;
  };
}

// Context type
interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

// Define translation resources
const translations: TranslationResources = {
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.pricing": "Pricing",
    "nav.integration": "Integration",
    "nav.about": "About",
    "nav.contact": "Contact",
    "nav.login": "Log In",
    "nav.signup": "Sign Up",
    "nav.dashboard": "Dashboard",
    "nav.logout": "Log Out",
    
    // Hero Section
    "hero.title": "Access 50+ AI-Powered Chatbots for Your Business",
    "hero.subtitle": "Integrate smart chatbots into your applications for motivation, productivity, learning, customer support, and more.",
    "hero.cta": "Get Started for Free",
    "hero.secondaryCta": "Learn More",
    
    // Features
    "features.title": "Why Choose ChatBoost?",
    "features.affordable.title": "Affordable Plans",
    "features.affordable.description": "Access premium AI chatbots at a fraction of the cost of building your own.",
    "features.integration.title": "Easy Integration",
    "features.integration.description": "Implement our chatbots in minutes with our simple API, SDK, or embed code.",
    "features.international.title": "Global Reach",
    "features.international.description": "Support for multiple languages to reach customers worldwide.",
    
    // Auth
    "auth.login": "Log In",
    "auth.signup": "Sign Up",
    "auth.email": "Email Address",
    "auth.password": "Password",
    "auth.confirmPassword": "Confirm Password",
    "auth.forgotPassword": "Forgot Password?",
    "auth.resetPassword": "Reset Password",
    "auth.or": "Or continue with",
    "auth.name": "Full Name",
    "auth.alreadyAccount": "Already have an account?",
    "auth.noAccount": "Don't have an account?",
    "auth.createAccount": "Create Account",
    "auth.agreeTerms": "By signing up, you agree to our Terms and Privacy Policy",
    
    // Dashboard
    "dashboard.welcome": "Welcome to your Dashboard",
    "dashboard.chooseChatbot": "Choose a Chatbot",
    "dashboard.yourPlan": "Your Current Plan",
    "dashboard.usage": "Message Usage",
    "dashboard.messageCount": "{{used}}/{{total}} messages used today",
    "dashboard.integration": "Integration Options",
    "dashboard.generateKey": "Generate API Key",
    "dashboard.downloadSDK": "Download SDK",
    "dashboard.embedCode": "Get Embed Code",
    
    // Pricing
    "pricing.title": "Simple, Transparent Pricing",
    "pricing.subtitle": "Choose the plan that fits your needs",
    "pricing.free.title": "Free",
    "pricing.free.price": "$0",
    "pricing.free.period": "/month",
    "pricing.free.feature1": "10 messages/day",
    "pricing.free.feature2": "Access to basic chatbots",
    "pricing.free.feature3": "No integration",
    "pricing.free.cta": "Sign Up for Free",
    
    "pricing.individual.title": "Individual",
    "pricing.individual.price": "$2",
    "pricing.individual.period": "/month",
    "pricing.individual.feature1": "15 messages/day per bot",
    "pricing.individual.feature2": "Access to all chatbots",
    "pricing.individual.feature3": "Integration for one app",
    "pricing.individual.cta": "Start Individual Plan",
    
    "pricing.group.title": "Group",
    "pricing.group.price": "$15",
    "pricing.group.period": "/month",
    "pricing.group.feature1": "30 messages/day per bot",
    "pricing.group.feature2": "Up to 10 users",
    "pricing.group.feature3": "Group app integration",
    "pricing.group.cta": "Start Group Plan",
    
    "pricing.lifetime.title": "Lifetime",
    "pricing.lifetime.price": "$75",
    "pricing.lifetime.period": "one-time",
    "pricing.lifetime.feature1": "Unlimited messages",
    "pricing.lifetime.feature2": "All current & future bots",
    "pricing.lifetime.feature3": "Unlimited integrations",
    "pricing.lifetime.cta": "Get Lifetime Access",
    
    // Integration
    "integration.title": "Developer Integration",
    "integration.subtitle": "Integrate our chatbots into your application",
    "integration.api.title": "API Integration",
    "integration.api.description": "Use our RESTful API to integrate chatbots into your application",
    "integration.sdk.title": "JavaScript SDK",
    "integration.sdk.description": "Easily implement chatbots with our ready-to-use SDK",
    "integration.widget.title": "Embeddable Widget",
    "integration.widget.description": "Add a chatbot to your website with a simple code snippet",
    "integration.docs": "View Documentation",
    
    // About
    "about.title": "About ChatBoost",
    "about.mission.title": "Our Mission",
    "about.mission.description": "To make AI chatbots accessible and affordable for everyone.",
    "about.vision.title": "Our Vision",
    "about.vision.description": "A world where every business can leverage AI to enhance customer experience.",
    "about.team.title": "Our Team",
    "about.founder": "Founder",
    
    // Contact
    "contact.title": "Contact Us",
    "contact.subtitle": "Have questions? We're here to help.",
    "contact.name": "Your Name",
    "contact.email": "Email Address",
    "contact.message": "Message",
    "contact.send": "Send Message",
    "contact.followUs": "Follow Us",
    "contact.submitted": "Thank you! Your message has been sent.",
    
    // Feedback
    "feedback.title": "Your Feedback Matters",
    "feedback.subtitle": "Help us improve ChatBoost with your feedback",
    "feedback.name": "Your Name",
    "feedback.email": "Email Address",
    "feedback.message": "Your Feedback",
    "feedback.marketing": "Subscribe to newsletter and updates",
    "feedback.submit": "Submit Feedback",
    "feedback.thanks": "Thank you for your feedback!",

    // Footer
    "footer.copyright": "© 2025 ChatBoost. All rights reserved.",
    "footer.terms": "Terms of Service",
    "footer.privacy": "Privacy Policy",
  },
  es: {
    // Navigation
    "nav.home": "Inicio",
    "nav.pricing": "Precios",
    "nav.integration": "Integración",
    "nav.about": "Acerca de",
    "nav.contact": "Contacto",
    "nav.login": "Iniciar Sesión",
    "nav.signup": "Registrarse",
    "nav.dashboard": "Panel",
    "nav.logout": "Cerrar Sesión",
    
    // Hero Section
    "hero.title": "Acceda a más de 50 chatbots con IA para su negocio",
    "hero.subtitle": "Integre chatbots inteligentes en sus aplicaciones para motivación, productividad, aprendizaje, atención al cliente y más.",
    "hero.cta": "Comenzar Gratis",
    "hero.secondaryCta": "Más Información",
    
    // Features
    "features.title": "¿Por qué elegir ChatBoost?",
    "features.affordable.title": "Planes Asequibles",
    "features.affordable.description": "Acceda a chatbots de IA premium a una fracción del costo de crear el suyo propio.",
    "features.integration.title": "Integración Sencilla",
    "features.integration.description": "Implemente nuestros chatbots en minutos con nuestra simple API, SDK o código incrustado.",
    "features.international.title": "Alcance Global",
    "features.international.description": "Soporte para múltiples idiomas para llegar a clientes en todo el mundo.",
    
    // Auth
    "auth.login": "Iniciar Sesión",
    "auth.signup": "Registrarse",
    "auth.email": "Correo Electrónico",
    "auth.password": "Contraseña",
    "auth.confirmPassword": "Confirmar Contraseña",
    "auth.forgotPassword": "¿Olvidó su Contraseña?",
    "auth.resetPassword": "Restablecer Contraseña",
    "auth.or": "O continuar con",
    "auth.name": "Nombre Completo",
    "auth.alreadyAccount": "¿Ya tiene una cuenta?",
    "auth.noAccount": "¿No tiene una cuenta?",
    "auth.createAccount": "Crear Cuenta",
    "auth.agreeTerms": "Al registrarse, acepta nuestros Términos y Política de Privacidad",
    
    // Dashboard
    "dashboard.welcome": "Bienvenido a su Panel",
    "dashboard.chooseChatbot": "Elija un Chatbot",
    "dashboard.yourPlan": "Su Plan Actual",
    "dashboard.usage": "Uso de Mensajes",
    "dashboard.messageCount": "{{used}}/{{total}} mensajes usados hoy",
    "dashboard.integration": "Opciones de Integración",
    "dashboard.generateKey": "Generar Clave API",
    "dashboard.downloadSDK": "Descargar SDK",
    "dashboard.embedCode": "Obtener Código de Incrustación",
    
    // Pricing
    "pricing.title": "Precios Simples y Transparentes",
    "pricing.subtitle": "Elija el plan que se ajuste a sus necesidades",
    "pricing.free.title": "Gratis",
    "pricing.free.price": "$0",
    "pricing.free.period": "/mes",
    "pricing.free.feature1": "10 mensajes/día",
    "pricing.free.feature2": "Acceso a chatbots básicos",
    "pricing.free.feature3": "Sin integración",
    "pricing.free.cta": "Registrarse Gratis",
    
    "pricing.individual.title": "Individual",
    "pricing.individual.price": "$2",
    "pricing.individual.period": "/mes",
    "pricing.individual.feature1": "15 mensajes/día por bot",
    "pricing.individual.feature2": "Acceso a todos los chatbots",
    "pricing.individual.feature3": "Integración para una app",
    "pricing.individual.cta": "Comenzar Plan Individual",
    
    "pricing.group.title": "Grupo",
    "pricing.group.price": "$15",
    "pricing.group.period": "/mes",
    "pricing.group.feature1": "30 mensajes/día por bot",
    "pricing.group.feature2": "Hasta 10 usuarios",
    "pricing.group.feature3": "Integración de app grupal",
    "pricing.group.cta": "Comenzar Plan Grupal",
    
    "pricing.lifetime.title": "De por vida",
    "pricing.lifetime.price": "$75",
    "pricing.lifetime.period": "pago único",
    "pricing.lifetime.feature1": "Mensajes ilimitados",
    "pricing.lifetime.feature2": "Todos los bots actuales y futuros",
    "pricing.lifetime.feature3": "Integraciones ilimitadas",
    "pricing.lifetime.cta": "Obtener Acceso de Por Vida",
    
    // Integration
    "integration.title": "Integración para Desarrolladores",
    "integration.subtitle": "Integre nuestros chatbots en su aplicación",
    "integration.api.title": "Integración API",
    "integration.api.description": "Utilice nuestra API RESTful para integrar chatbots en su aplicación",
    "integration.sdk.title": "SDK JavaScript",
    "integration.sdk.description": "Implemente chatbots fácilmente con nuestro SDK listo para usar",
    "integration.widget.title": "Widget Incrustable",
    "integration.widget.description": "Agregue un chatbot a su sitio web con un simple fragmento de código",
    "integration.docs": "Ver Documentación",
    
    // About
    "about.title": "Acerca de ChatBoost",
    "about.mission.title": "Nuestra Misión",
    "about.mission.description": "Hacer que los chatbots de IA sean accesibles y asequibles para todos.",
    "about.vision.title": "Nuestra Visión",
    "about.vision.description": "Un mundo donde cada empresa pueda aprovechar la IA para mejorar la experiencia del cliente.",
    "about.team.title": "Nuestro Equipo",
    "about.founder": "Fundador",
    
    // Contact
    "contact.title": "Contáctenos",
    "contact.subtitle": "¿Tiene preguntas? Estamos aquí para ayudar.",
    "contact.name": "Su Nombre",
    "contact.email": "Correo Electrónico",
    "contact.message": "Mensaje",
    "contact.send": "Enviar Mensaje",
    "contact.followUs": "Síganos",
    "contact.submitted": "¡Gracias! Su mensaje ha sido enviado.",
    
    // Feedback
    "feedback.title": "Su Opinión es Importante",
    "feedback.subtitle": "Ayúdenos a mejorar ChatBoost con sus comentarios",
    "feedback.name": "Su Nombre",
    "feedback.email": "Correo Electrónico",
    "feedback.message": "Sus Comentarios",
    "feedback.marketing": "Suscribirse al boletín y actualizaciones",
    "feedback.submit": "Enviar Comentarios",
    "feedback.thanks": "¡Gracias por sus comentarios!",

    // Footer
    "footer.copyright": "© 2025 ChatBoost. Todos los derechos reservados.",
    "footer.terms": "Términos de Servicio",
    "footer.privacy": "Política de Privacidad",
  },
  fr: {
    // Navigation
    "nav.home": "Accueil",
    "nav.pricing": "Tarifs",
    "nav.integration": "Intégration",
    "nav.about": "À propos",
    "nav.contact": "Contact",
    "nav.login": "Connexion",
    "nav.signup": "S'inscrire",
    "nav.dashboard": "Tableau de bord",
    "nav.logout": "Déconnexion",
    
    // Hero Section
    "hero.title": "Accédez à plus de 50 chatbots IA pour votre entreprise",
    "hero.subtitle": "Intégrez des chatbots intelligents dans vos applications pour la motivation, la productivité, l'apprentissage, le support client, et plus encore.",
    "hero.cta": "Commencer gratuitement",
    "hero.secondaryCta": "En savoir plus",
    
    // Features
    "features.title": "Pourquoi choisir ChatBoost?",
    "features.affordable.title": "Plans abordables",
    "features.affordable.description": "Accédez à des chatbots IA premium à une fraction du coût de la création de votre propre solution.",
    "features.integration.title": "Intégration facile",
    "features.integration.description": "Implémentez nos chatbots en quelques minutes avec notre API simple, SDK ou code d'intégration.",
    "features.international.title": "Portée mondiale",
    "features.international.description": "Support pour plusieurs langues pour atteindre les clients du monde entier.",
    
    // Auth
    "auth.login": "Connexion",
    "auth.signup": "S'inscrire",
    "auth.email": "Adresse e-mail",
    "auth.password": "Mot de passe",
    "auth.confirmPassword": "Confirmer le mot de passe",
    "auth.forgotPassword": "Mot de passe oublié?",
    "auth.resetPassword": "Réinitialiser le mot de passe",
    "auth.or": "Ou continuer avec",
    "auth.name": "Nom complet",
    "auth.alreadyAccount": "Vous avez déjà un compte?",
    "auth.noAccount": "Vous n'avez pas de compte?",
    "auth.createAccount": "Créer un compte",
    "auth.agreeTerms": "En vous inscrivant, vous acceptez nos Conditions et notre Politique de confidentialité",
    
    // Dashboard
    "dashboard.welcome": "Bienvenue sur votre tableau de bord",
    "dashboard.chooseChatbot": "Choisir un chatbot",
    "dashboard.yourPlan": "Votre forfait actuel",
    "dashboard.usage": "Utilisation des messages",
    "dashboard.messageCount": "{{used}}/{{total}} messages utilisés aujourd'hui",
    "dashboard.integration": "Options d'intégration",
    "dashboard.generateKey": "Générer une clé API",
    "dashboard.downloadSDK": "Télécharger le SDK",
    "dashboard.embedCode": "Obtenir le code d'intégration",
    
    // Pricing
    "pricing.title": "Tarification simple et transparente",
    "pricing.subtitle": "Choisissez le forfait qui correspond à vos besoins",
    "pricing.free.title": "Gratuit",
    "pricing.free.price": "0€",
    "pricing.free.period": "/mois",
    "pricing.free.feature1": "10 messages/jour",
    "pricing.free.feature2": "Accès aux chatbots de base",
    "pricing.free.feature3": "Pas d'intégration",
    "pricing.free.cta": "S'inscrire gratuitement",
    
    "pricing.individual.title": "Individuel",
    "pricing.individual.price": "2€",
    "pricing.individual.period": "/mois",
    "pricing.individual.feature1": "15 messages/jour par bot",
    "pricing.individual.feature2": "Accès à tous les chatbots",
    "pricing.individual.feature3": "Intégration pour une application",
    "pricing.individual.cta": "Commencer le forfait individuel",
    
    "pricing.group.title": "Groupe",
    "pricing.group.price": "15€",
    "pricing.group.period": "/mois",
    "pricing.group.feature1": "30 messages/jour par bot",
    "pricing.group.feature2": "Jusqu'à 10 utilisateurs",
    "pricing.group.feature3": "Intégration d'applications de groupe",
    "pricing.group.cta": "Commencer le forfait de groupe",
    
    "pricing.lifetime.title": "À vie",
    "pricing.lifetime.price": "75€",
    "pricing.lifetime.period": "paiement unique",
    "pricing.lifetime.feature1": "Messages illimités",
    "pricing.lifetime.feature2": "Tous les bots actuels et futurs",
    "pricing.lifetime.feature3": "Intégrations illimitées",
    "pricing.lifetime.cta": "Obtenir un accès à vie",
    
    // Integration
    "integration.title": "Intégration pour développeurs",
    "integration.subtitle": "Intégrez nos chatbots dans votre application",
    "integration.api.title": "Intégration API",
    "integration.api.description": "Utilisez notre API RESTful pour intégrer des chatbots dans votre application",
    "integration.sdk.title": "SDK JavaScript",
    "integration.sdk.description": "Implémentez facilement des chatbots avec notre SDK prêt à l'emploi",
    "integration.widget.title": "Widget intégrable",
    "integration.widget.description": "Ajoutez un chatbot à votre site web avec un simple extrait de code",
    "integration.docs": "Voir la documentation",
    
    // About
    "about.title": "À propos de ChatBoost",
    "about.mission.title": "Notre mission",
    "about.mission.description": "Rendre les chatbots IA accessibles et abordables pour tous.",
    "about.vision.title": "Notre vision",
    "about.vision.description": "Un monde où chaque entreprise peut tirer parti de l'IA pour améliorer l'expérience client.",
    "about.team.title": "Notre équipe",
    "about.founder": "Fondateur",
    
    // Contact
    "contact.title": "Contactez-nous",
    "contact.subtitle": "Des questions? Nous sommes là pour vous aider.",
    "contact.name": "Votre nom",
    "contact.email": "Adresse e-mail",
    "contact.message": "Message",
    "contact.send": "Envoyer le message",
    "contact.followUs": "Suivez-nous",
    "contact.submitted": "Merci! Votre message a été envoyé.",
    
    // Feedback
    "feedback.title": "Votre avis compte",
    "feedback.subtitle": "Aidez-nous à améliorer ChatBoost avec vos commentaires",
    "feedback.name": "Votre nom",
    "feedback.email": "Adresse e-mail",
    "feedback.message": "Vos commentaires",
    "feedback.marketing": "S'abonner à la newsletter et aux mises à jour",
    "feedback.submit": "Soumettre les commentaires",
    "feedback.thanks": "Merci pour vos commentaires!",

    // Footer
    "footer.copyright": "© 2025 ChatBoost. Tous droits réservés.",
    "footer.terms": "Conditions d'utilisation",
    "footer.privacy": "Politique de confidentialité",
  }
};

// Create the context
const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  t: () => "",
});

// Context provider component
export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(
    () => (localStorage.getItem("language") as Language) || "en"
  );

  // Update localStorage when language changes
  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  // Translation function
  const t = (key: string): string => {
    const translation = translations[language]?.[key];
    if (!translation) {
      console.warn(`Translation '${key}' for language '${language}' not found.`);
      // Fallback to English or return the key
      return translations.en?.[key] || key;
    }
    return translation;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook for using the language context
export const useLanguage = () => {
  return useContext(LanguageContext);
};
