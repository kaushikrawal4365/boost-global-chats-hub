
import React, { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Facebook, Github, Linkedin, Mail, MapPin, Phone, Twitter } from "lucide-react";
import { toast } from "sonner";

const Contact: React.FC = () => {
  const { t } = useLanguage();
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      toast.success(t("contact.submitted"));
      
      // Reset form
      setName("");
      setEmail("");
      setMessage("");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white pt-16 pb-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">{t("contact.title")}</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t("contact.subtitle")}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Contact Form */}
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6">Send us a message</h2>
            
            {isSubmitted ? (
              <div className="bg-green-50 border border-green-200 text-green-700 rounded-md p-6 text-center">
                <h3 className="text-lg font-medium mb-2">Thank you!</h3>
                <p>Your message has been sent successfully. We'll get back to you as soon as possible.</p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => setIsSubmitted(false)}
                >
                  Send another message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">{t("contact.name")}</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">{t("contact.email")}</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">{t("contact.message")}</Label>
                  <Textarea
                    id="message"
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                  />
                </div>

                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : t("contact.send")}
                </Button>
              </form>
            )}
          </div>

          {/* Contact Info */}
          <div>
            <div className="bg-white p-8 rounded-lg shadow-md mb-6">
              <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <Mail className="h-5 w-5 text-primary mt-1 mr-3" />
                  <div>
                    <h3 className="font-medium">Email</h3>
                    <p className="text-gray-600">support@chatboost.ai</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Phone className="h-5 w-5 text-primary mt-1 mr-3" />
                  <div>
                    <h3 className="font-medium">Phone</h3>
                    <p className="text-gray-600">+1 (555) 123-4567</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-primary mt-1 mr-3" />
                  <div>
                    <h3 className="font-medium">Address</h3>
                    <p className="text-gray-600">
                      123 AI Avenue<br />
                      San Francisco, CA 94107<br />
                      United States
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="font-medium mb-3">{t("contact.followUs")}</h3>
                <div className="flex space-x-4">
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-100 hover:bg-gray-200 text-gray-600 p-3 rounded-full"
                  >
                    <Twitter className="h-5 w-5" />
                  </a>
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-100 hover:bg-gray-200 text-gray-600 p-3 rounded-full"
                  >
                    <Facebook className="h-5 w-5" />
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-100 hover:bg-gray-200 text-gray-600 p-3 rounded-full"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-100 hover:bg-gray-200 text-gray-600 p-3 rounded-full"
                  >
                    <Github className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>

            {/* FAQ */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium text-lg mb-2">How quickly will you respond to my inquiry?</h3>
                  <p className="text-gray-600">We typically respond to all inquiries within 24 hours during business days.</p>
                </div>
                
                <div>
                  <h3 className="font-medium text-lg mb-2">Can I schedule a demo of the platform?</h3>
                  <p className="text-gray-600">Yes! You can request a personalized demo by filling out the contact form or emailing us directly at support@chatboost.ai.</p>
                </div>
                
                <div>
                  <h3 className="font-medium text-lg mb-2">Do you offer custom solutions?</h3>
                  <p className="text-gray-600">Absolutely. For enterprise clients or specific needs, we can develop custom chatbot solutions. Contact us to discuss your requirements.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
