
import React, { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

interface FeedbackEntry {
  id: string;
  name: string;
  email: string;
  message: string;
  subscribe: boolean;
  timestamp: string;
}

const Feedback: React.FC = () => {
  const { t } = useLanguage();
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [subscribe, setSubscribe] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [feedbackHistory, setFeedbackHistory] = useState<FeedbackEntry[]>([]);
  const [viewHistory, setViewHistory] = useState(false);

  useEffect(() => {
    // Load feedback history from localStorage when component mounts
    const storedFeedback = localStorage.getItem("feedback_history");
    if (storedFeedback) {
      try {
        setFeedbackHistory(JSON.parse(storedFeedback));
      } catch (error) {
        console.error("Failed to parse stored feedback:", error);
      }
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Create new feedback entry
    const newFeedback: FeedbackEntry = {
      id: `feedback_${Date.now()}`,
      name,
      email,
      message,
      subscribe,
      timestamp: new Date().toISOString()
    };

    // Update feedback history
    const updatedFeedback = [...feedbackHistory, newFeedback];
    
    // Store in localStorage
    localStorage.setItem("feedback_history", JSON.stringify(updatedFeedback));

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFeedbackHistory(updatedFeedback);
      toast.success(t("feedback.thanks"));
      
      // Reset form
      setName("");
      setEmail("");
      setMessage("");
      setSubscribe(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white pt-16 pb-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">{t("feedback.title")}</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t("feedback.subtitle")}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white p-8 rounded-lg shadow-md">
            {isSubmitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <h2 className="text-2xl font-bold mb-2">{t("feedback.thanks")}</h2>
                <p className="text-gray-600 mb-6">
                  We appreciate you taking the time to share your feedback with us. Your input helps us improve ChatBoost for everyone.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button onClick={() => setIsSubmitted(false)}>
                    Submit Another Feedback
                  </Button>
                  <Button variant="outline" onClick={() => setViewHistory(!viewHistory)}>
                    {viewHistory ? "Hide Feedback History" : "View Feedback History"}
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">{t("feedback.name")}</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">{t("feedback.email")}</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">{t("feedback.message")}</Label>
                  <Textarea
                    id="message"
                    rows={6}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    placeholder="Tell us what you like about ChatBoost, what could be improved, or any features you'd like to see in the future."
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="subscribe" 
                    checked={subscribe} 
                    onCheckedChange={(checked) => setSubscribe(checked === true)}
                  />
                  <Label htmlFor="subscribe" className="text-sm">
                    {t("feedback.marketing")}
                  </Label>
                </div>

                <Button type="submit" disabled={isSubmitting} className="w-full">
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    t("feedback.submit")
                  )}
                </Button>
                
                {feedbackHistory.length > 0 && (
                  <Button 
                    variant="outline" 
                    type="button"
                    className="w-full mt-2"
                    onClick={() => setViewHistory(!viewHistory)}
                  >
                    {viewHistory ? "Hide Feedback History" : "View Feedback History"}
                  </Button>
                )}
              </form>
            )}
            
            {viewHistory && feedbackHistory.length > 0 && (
              <div className="mt-8 border-t pt-6">
                <h3 className="text-xl font-semibold mb-4">Feedback History</h3>
                <div className="space-y-6">
                  {feedbackHistory.map((entry) => (
                    <div key={entry.id} className="bg-gray-50 p-4 rounded-md">
                      <div className="flex justify-between mb-2">
                        <span className="font-medium">{entry.name}</span>
                        <span className="text-sm text-gray-500">
                          {new Date(entry.timestamp).toLocaleString()}
                        </span>
                      </div>
                      <div className="text-sm text-gray-500 mb-2">{entry.email}</div>
                      <div className="text-gray-700">{entry.message}</div>
                      {entry.subscribe && (
                        <div className="mt-2 text-sm text-blue-600">Subscribed to marketing emails</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
