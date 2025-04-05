
import React, { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, Check, Download, ArrowRight } from "lucide-react";
import { toast } from "sonner";

const Integration: React.FC = () => {
  const { t } = useLanguage();
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
    toast.success("Code copied to clipboard");
  };

  const handleDownload = (filename: string) => {
    toast.success(`${filename} downloaded successfully`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white pt-16 pb-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">{t("integration.title")}</h1>
          <p className="text-xl text-gray-600 max-w-2xl">
            {t("integration.subtitle")}
          </p>
        </div>
      </div>

      {/* Integration Tabs */}
      <div className="container mx-auto px-4 py-12">
        <Tabs defaultValue="api" className="space-y-8">
          <TabsList className="w-full max-w-md mx-auto grid grid-cols-3">
            <TabsTrigger value="api">API</TabsTrigger>
            <TabsTrigger value="sdk">SDK</TabsTrigger>
            <TabsTrigger value="widget">Widget</TabsTrigger>
          </TabsList>

          {/* API Tab */}
          <TabsContent value="api">
            <div className="max-w-3xl mx-auto">
              <div className="bg-white p-8 rounded-lg shadow-md mb-8">
                <h2 className="text-2xl font-bold mb-4">{t("integration.api.title")}</h2>
                <p className="text-gray-600 mb-6">{t("integration.api.description")}</p>

                {/* Authentication Section */}
                <div className="mb-8">
                  <h3 className="text-xl font-medium mb-3">Authentication</h3>
                  <p className="text-gray-600 mb-4">
                    To authenticate with the ChatBoost API, include your API key in the Authorization header:
                  </p>

                  <div className="bg-gray-900 text-gray-100 p-4 rounded-md font-mono text-sm mb-4">
                    <div className="flex justify-between items-start">
                      <pre>Authorization: Bearer YOUR_API_KEY</pre>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="text-gray-300 hover:text-white"
                        onClick={() => handleCopy("Authorization: Bearer YOUR_API_KEY", "auth")}
                      >
                        {copied === "auth" ? (
                          <Check className="h-4 w-4" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Endpoints Section */}
                <div className="mb-8">
                  <h3 className="text-xl font-medium mb-3">Endpoints</h3>

                  {/* Chat Endpoint */}
                  <div className="mb-6">
                    <h4 className="text-lg font-medium mb-2">Send a message</h4>
                    <p className="text-gray-600 mb-3">
                      <code className="bg-gray-100 text-gray-800 px-1 rounded">POST /api/chatbot/{"{botId}"}</code>
                    </p>

                    <div className="bg-gray-900 text-gray-100 p-4 rounded-md font-mono text-sm mb-4">
                      <div className="flex justify-between items-start">
                        <pre>{`curl -X POST https://api.chatboost.ai/v1/chat \\
-H "Content-Type: application/json" \\
-H "Authorization: Bearer YOUR_API_KEY" \\
-d '{
  "botId": "productivity",
  "message": "How can I improve my focus?"
}'`}</pre>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="text-gray-300 hover:text-white"
                          onClick={() => handleCopy(`curl -X POST https://api.chatboost.ai/v1/chat \\
-H "Content-Type: application/json" \\
-H "Authorization: Bearer YOUR_API_KEY" \\
-d '{
  "botId": "productivity",
  "message": "How can I improve my focus?"
}'`, "curl")}
                        >
                          {copied === "curl" ? (
                            <Check className="h-4 w-4" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>

                    <h4 className="text-lg font-medium mb-2">Response</h4>
                    <div className="bg-gray-900 text-gray-100 p-4 rounded-md font-mono text-sm">
                      <pre>{`{
  "id": "msg_123abc",
  "botId": "productivity",
  "message": "Try the Pomodoro Technique: work for 25 minutes, then take a 5-minute break. Also, remove distractions from your workspace and consider using noise-cancelling headphones.",
  "timestamp": "2025-04-05T14:22:31Z"
}`}</pre>
                    </div>
                  </div>

                  {/* Get Chatbots Endpoint */}
                  <div>
                    <h4 className="text-lg font-medium mb-2">List available chatbots</h4>
                    <p className="text-gray-600 mb-3">
                      <code className="bg-gray-100 text-gray-800 px-1 rounded">GET /api/chatbots</code>
                    </p>

                    <div className="bg-gray-900 text-gray-100 p-4 rounded-md font-mono text-sm mb-4">
                      <div className="flex justify-between items-start">
                        <pre>{`curl https://api.chatboost.ai/v1/chatbots \\
-H "Authorization: Bearer YOUR_API_KEY"`}</pre>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="text-gray-300 hover:text-white"
                          onClick={() => handleCopy(`curl https://api.chatboost.ai/v1/chatbots \\
-H "Authorization: Bearer YOUR_API_KEY"`, "curl-list")}
                        >
                          {copied === "curl-list" ? (
                            <Check className="h-4 w-4" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <Button variant="outline" className="mt-4">
                  <ArrowRight className="h-4 w-4 mr-2" />
                  {t("integration.docs")}
                </Button>
              </div>
            </div>
          </TabsContent>

          {/* SDK Tab */}
          <TabsContent value="sdk">
            <div className="max-w-3xl mx-auto">
              <div className="bg-white p-8 rounded-lg shadow-md mb-8">
                <h2 className="text-2xl font-bold mb-4">{t("integration.sdk.title")}</h2>
                <p className="text-gray-600 mb-6">{t("integration.sdk.description")}</p>

                {/* Installation Section */}
                <div className="mb-8">
                  <h3 className="text-xl font-medium mb-3">Installation</h3>
                  <p className="text-gray-600 mb-4">
                    Install the ChatBoost SDK using npm or yarn:
                  </p>

                  <div className="bg-gray-900 text-gray-100 p-4 rounded-md font-mono text-sm mb-6">
                    <div className="flex justify-between items-start">
                      <pre>npm install chatboost-sdk</pre>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="text-gray-300 hover:text-white"
                        onClick={() => handleCopy("npm install chatboost-sdk", "npm")}
                      >
                        {copied === "npm" ? (
                          <Check className="h-4 w-4" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>

                  <div className="flex">
                    <Button 
                      variant="outline" 
                      className="flex-1 mr-2" 
                      onClick={() => handleDownload("chatboost-sdk-1.0.0.tgz")}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download SDK Package
                    </Button>
                    <Button 
                      variant="outline" 
                      className="flex-1" 
                      onClick={() => handleDownload("chatboost-sdk-docs.pdf")}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download Documentation
                    </Button>
                  </div>
                </div>

                {/* Usage Section */}
                <div>
                  <h3 className="text-xl font-medium mb-3">Usage</h3>
                  <p className="text-gray-600 mb-4">
                    Example of how to use the ChatBoost SDK in your JavaScript application:
                  </p>

                  <div className="bg-gray-900 text-gray-100 p-4 rounded-md font-mono text-sm mb-6">
                    <div className="flex justify-between items-start">
                      <pre>{`// Initialize the ChatBoost client
import { ChatBoost } from 'chatboost-sdk';

const chatboost = new ChatBoost({
  apiKey: 'YOUR_API_KEY'
});

// Send a message to a chatbot
async function sendMessage() {
  try {
    const response = await chatboost.sendMessage({
      botId: 'productivity',
      message: 'How can I improve my time management?'
    });
    
    console.log(response.message);
  } catch (error) {
    console.error('Error:', error);
  }
}

// List available chatbots
async function listChatbots() {
  try {
    const chatbots = await chatboost.listChatbots();
    console.log(chatbots);
  } catch (error) {
    console.error('Error:', error);
  }
}`}</pre>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="text-gray-300 hover:text-white"
                        onClick={() => handleCopy(`// Initialize the ChatBoost client
import { ChatBoost } from 'chatboost-sdk';

const chatboost = new ChatBoost({
  apiKey: 'YOUR_API_KEY'
});

// Send a message to a chatbot
async function sendMessage() {
  try {
    const response = await chatboost.sendMessage({
      botId: 'productivity',
      message: 'How can I improve my time management?'
    });
    
    console.log(response.message);
  } catch (error) {
    console.error('Error:', error);
  }
}

// List available chatbots
async function listChatbots() {
  try {
    const chatbots = await chatboost.listChatbots();
    console.log(chatbots);
  } catch (error) {
    console.error('Error:', error);
  }
}`, "sdk-example")}
                        >
                          {copied === "sdk-example" ? (
                            <Check className="h-4 w-4" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                  </div>

                  <Button variant="outline" className="mt-4">
                    <ArrowRight className="h-4 w-4 mr-2" />
                    {t("integration.docs")}
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Widget Tab */}
          <TabsContent value="widget">
            <div className="max-w-3xl mx-auto">
              <div className="bg-white p-8 rounded-lg shadow-md mb-8">
                <h2 className="text-2xl font-bold mb-4">{t("integration.widget.title")}</h2>
                <p className="text-gray-600 mb-6">{t("integration.widget.description")}</p>

                {/* Widget Integration Section */}
                <div className="mb-8">
                  <h3 className="text-xl font-medium mb-3">Quick Integration</h3>
                  <p className="text-gray-600 mb-4">
                    Add this code to your website to embed the ChatBoost widget:
                  </p>

                  <div className="bg-gray-900 text-gray-100 p-4 rounded-md font-mono text-sm mb-4">
                    <div className="flex justify-between items-start">
                      <pre>{`<script src="https://cdn.chatboost.ai/widget.js"></script>
<script>
  ChatBoost.init({
    apiKey: 'YOUR_API_KEY',
    botId: 'productivity',
    theme: 'light',
    position: 'bottom-right'
  });
</script>`}</pre>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="text-gray-300 hover:text-white"
                        onClick={() => handleCopy(`<script src="https://cdn.chatboost.ai/widget.js"></script>
<script>
  ChatBoost.init({
    apiKey: 'YOUR_API_KEY',
    botId: 'productivity',
    theme: 'light',
    position: 'bottom-right'
  });
</script>`, "widget-code")}
                      >
                        {copied === "widget-code" ? (
                          <Check className="h-4 w-4" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Widget Configuration Section */}
                <div className="mb-8">
                  <h3 className="text-xl font-medium mb-3">Customization Options</h3>
                  <p className="text-gray-600 mb-4">
                    Configure the widget appearance and behavior:
                  </p>

                  <div className="bg-gray-900 text-gray-100 p-4 rounded-md font-mono text-sm mb-6">
                    <pre>{`ChatBoost.init({
  apiKey: 'YOUR_API_KEY',
  botId: 'productivity',
  theme: 'light', // 'light' or 'dark'
  position: 'bottom-right', // 'bottom-right', 'bottom-left', etc.
  greeting: 'How can I help you today?',
  title: 'Support Assistant',
  subtitle: 'Typically replies in a few minutes',
  primaryColor: '#007BFF',
  buttonIcon: 'chat', // 'chat', 'help', 'message'
  height: '500px',
  width: '350px',
});`}</pre>
                  </div>
                </div>

                {/* Widget Preview */}
                <div>
                  <h3 className="text-xl font-medium mb-3">Widget Preview</h3>
                  <div className="bg-gray-100 p-6 rounded-lg mb-6">
                    <div className="max-w-xs mx-auto">
                      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                        <div className="bg-primary p-4 text-white">
                          <h4 className="font-bold">Support Assistant</h4>
                          <p className="text-sm text-blue-100">Typically replies in a few minutes</p>
                        </div>
                        <div className="h-64 p-4 bg-gray-50 flex flex-col justify-end">
                          <div className="bg-blue-100 p-3 rounded-lg mb-3 max-w-[80%] text-sm">
                            <p>Hello! How can I help you today?</p>
                          </div>
                          <div className="bg-primary text-white p-3 rounded-lg mb-3 max-w-[80%] text-sm self-end">
                            <p>I need help with my account settings.</p>
                          </div>
                          <div className="bg-blue-100 p-3 rounded-lg max-w-[80%] text-sm">
                            <p>I'd be happy to help with that! Which specific settings are you trying to adjust?</p>
                          </div>
                        </div>
                        <div className="p-3 border-t">
                          <div className="flex">
                            <div className="flex-1">
                              <input type="text" placeholder="Type your message..." className="w-full p-2 rounded-md border border-gray-300 text-sm" />
                            </div>
                            <button className="ml-2 bg-primary text-white px-4 py-2 rounded-md text-sm">Send</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Button variant="outline" className="mt-4">
                    <ArrowRight className="h-4 w-4 mr-2" />
                    {t("integration.docs")}
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Integration;
