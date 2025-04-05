
import React from "react";

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      
      <div className="prose max-w-none">
        <p className="mb-6">
          Your privacy is important to us. This Privacy Policy explains how ChatBoost collects, uses, discloses, 
          and safeguards your information when you use our service.
        </p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">1. Information We Collect</h2>
        <p className="mb-4">
          We collect information you provide directly to us, such as when you create an account, subscribe to our service, 
          contact us for support, or interact with our chatbots. This may include:
        </p>
        <ul className="list-disc ml-6 mb-4">
          <li>Name and contact details</li>
          <li>Account credentials</li>
          <li>Payment information</li>
          <li>Communication preferences</li>
          <li>Chat history and messages</li>
        </ul>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">2. How We Use Your Information</h2>
        <p className="mb-4">We use your information to:</p>
        <ul className="list-disc ml-6 mb-4">
          <li>Provide and maintain our services</li>
          <li>Process transactions</li>
          <li>Improve and personalize user experience</li>
          <li>Monitor usage patterns</li>
          <li>Communicate with you</li>
          <li>Protect against misuse</li>
        </ul>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">3. Data Security</h2>
        <p className="mb-4">
          We implement appropriate security measures to protect against unauthorized access, alteration, 
          disclosure, or destruction of your personal information.
        </p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">4. Data Retention</h2>
        <p className="mb-4">
          We retain your information for as long as your account is active or as needed to provide you services. 
          We will also retain and use your information as necessary to comply with legal obligations.
        </p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">5. Your Rights</h2>
        <p className="mb-4">
          You have the right to access, correct, or delete your personal information. You can manage many aspects 
          of your information through your account settings or by contacting us directly.
        </p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">6. Changes To This Policy</h2>
        <p className="mb-4">
          We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new 
          Privacy Policy on this page and updating the "Last updated" date.
        </p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">7. Contact Us</h2>
        <p className="mb-4">
          If you have any questions about this Privacy Policy, please contact us at privacy@chatboost.ai.
        </p>
        
        <p className="mt-8 text-gray-500">Last updated: April 5, 2025</p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
