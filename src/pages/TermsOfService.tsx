
import React from "react";

const TermsOfService: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
      
      <div className="prose max-w-none">
        <h2 className="text-2xl font-semibold mt-8 mb-4">1. Introduction</h2>
        <p className="mb-4">
          Welcome to ChatBoost ("we," "our," or "us"). By accessing or using our service, you agree to be bound by these Terms of Service ("Terms").
        </p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">2. Use of Service</h2>
        <p className="mb-4">
          You agree to use our service only for lawful purposes and in a way that does not infringe upon the rights of others. You are responsible for all content you provide to the service.
        </p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">3. Account Registration</h2>
        <p className="mb-4">
          When you create an account with us, you must provide accurate and complete information. You are responsible for maintaining the confidentiality of your account and password.
        </p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">4. Subscription and Payments</h2>
        <p className="mb-4">
          We offer various subscription plans with different features and pricing. You agree to pay all fees and charges associated with your selected plan.
        </p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">5. API Usage</h2>
        <p className="mb-4">
          API keys provided by ChatBoost are for your use only. You agree not to share your API key with third parties and to follow the rate limits specified for your subscription plan.
        </p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">6. Content Ownership</h2>
        <p className="mb-4">
          You retain all rights to the content you provide to our service. By submitting content, you grant us a worldwide license to use, store, and display your content in order to provide and improve our services.
        </p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">7. Termination</h2>
        <p className="mb-4">
          We reserve the right to suspend or terminate your account if you violate these Terms or if your usage presents a security risk to our platform.
        </p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">8. Contact Information</h2>
        <p className="mb-4">
          If you have any questions about these Terms, please contact us at support@chatboost.ai.
        </p>
        
        <p className="mt-8 text-gray-500">Last updated: April 5, 2025</p>
      </div>
    </div>
  );
};

export default TermsOfService;
