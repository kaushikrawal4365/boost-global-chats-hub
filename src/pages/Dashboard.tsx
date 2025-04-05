
import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Bot, Copy, Download, Key, MessageSquare, Send } from "lucide-react";
import { toast } from "sonner";

// Mock chatbot data
const chatbots = [
  {
    id: "motivation",
    name: "Motivation Coach",
    description: "Daily motivation and personalized coaching",
    icon: <Bot className="w-6 h-6 text-white" />,
    color: "bg-blue-500",
  },
  {
    id: "productivity",
    name: "Productivity Assistant",
    description: "Task management and productivity tips",
    icon: <Bot className="w-6 h-6 text-white" />,
    color: "bg-green-500",
  },
  {
    id: "language",
    name: "Language Tutor",
    description: "Learn new languages with interactive lessons",
    icon: <Bot className="w-6 h-6 text-white" />,
    color: "bg-purple-500",
  },
  {
    id: "support",
    name: "Customer Support",
    description: "24/7 automated support for your customers",
    icon: <Bot className="w-6 h-6 text-white" />,
    color: "bg-red-500",
  },
  {
    id: "fitness",
    name: "Fitness Trainer",
    description: "Personalized workout plans and nutrition advice",
    icon: <Bot className="w-6 h-6 text-white" />,
    color: "bg-orange-500",
  },
  {
    id: "meditation",
    name: "Meditation Guide",
    description: "Guided meditation sessions and mindfulness tips",
    icon: <Bot className="w-6 h-6 text-white" />,
    color: "bg-teal-500",
  },
  {
    id: "study",
    name: "Study Buddy",
    description: "Help with studying and exam preparation",
    icon: <Bot className="w-6 h-6 text-white" />,
    color: "bg-indigo-500",
  },
  {
    id: "cooking",
    name: "Cooking Assistant",
    description: "Recipe recommendations and cooking tips",
    icon: <Bot className="w-6 h-6 text-white" />,
    color: "bg-pink-500",
  },
];

interface Message {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const Dashboard: React.FC = () => {
  const { t } = useLanguage();
  const { user, isAuthenticated, isLoading } = useAuth();
  
  const [selectedChatbot, setSelectedChatbot] = useState(chatbots[0]);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [activeTab, setActiveTab] = useState("chat");
  const [apiKey, setApiKey] = useState("");
  const [isGeneratingKey, setIsGeneratingKey] = useState(false);

  // If not authenticated, redirect to login
  if (isLoading) return <div className="flex items-center justify-center min-h-screen"><p>Loading...</p></div>;
  if (!isAuthenticated) return <Navigate to="/login" />;

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content: message,
      sender: "user",
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setMessage("");
    
    // Simulate bot response after a delay
    setTimeout(() => {
      let botResponse = "";
      
      switch (selectedChatbot.id) {
        case "motivation":
          botResponse = "You're doing great! Remember that every step forward counts, no matter how small.";
          break;
        case "productivity":
          botResponse = "Have you tried using the Pomodoro technique? 25 minutes of focused work followed by a 5-minute break.";
          break;
        case "language":
          botResponse = "Great! Let's practice some common phrases in Spanish. Repeat after me: '¿Cómo estás hoy?' (How are you today?)";
          break;
        case "support":
          botResponse = "I'm happy to help with your question. Could you provide more details about the issue you're experiencing?";
          break;
        default:
          botResponse = "That's interesting! How can I assist you further with this?";
      }
      
      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        content: botResponse,
        sender: "bot",
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, botMessage]);
    }, 1000);
  };

  const generateApiKey = () => {
    setIsGeneratingKey(true);
    setTimeout(() => {
      setApiKey(`cb_${Math.random().toString(36).substring(2, 15)}_${Math.random().toString(36).substring(2, 15)}`);
      setIsGeneratingKey(false);
      toast.success("API key generated successfully");
    }, 1500);
  };

  const copyToClipboard = (text: string, message: string) => {
    navigator.clipboard.writeText(text);
    toast.success(message);
  };

  const renderPlanInfo = () => {
    switch (user?.plan) {
      case "free":
        return {
          name: "Free Plan",
          description: "10 messages/day after login, no integration",
          progressColor: "bg-blue-500",
        };
      case "individual":
        return {
          name: "Individual Plan",
          description: "15 messages/day per bot, integration for one web app",
          progressColor: "bg-green-500",
        };
      case "group":
        return {
          name: "Group Plan",
          description: "30 messages/day per bot, integration for one group app, up to 10 users",
          progressColor: "bg-purple-500",
        };
      case "lifetime":
        return {
          name: "Lifetime Plan",
          description: "Unlimited messages, unlimited integrations",
          progressColor: "bg-amber-500",
        };
    }
  };

  const planInfo = renderPlanInfo();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">{t("dashboard.welcome")}</h1>
        <p className="text-gray-600 mb-8">
          Hello, {user?.name}! Here's your ChatBoost dashboard.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* User info and stats */}
          <div className="lg:col-span-1 space-y-6">
            {/* User Plan */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-lg font-medium mb-4">{t("dashboard.yourPlan")}</h2>
              <div className="p-4 rounded-md bg-blue-50 mb-4">
                <p className="font-medium text-lg">{planInfo?.name}</p>
                <p className="text-gray-600 text-sm">{planInfo?.description}</p>
              </div>
              <h3 className="text-md font-medium mb-2">{t("dashboard.usage")}</h3>
              <div className="mb-2">
                <div className="flex justify-between text-sm mb-1">
                  <span>{user?.messagesUsed} / {user?.messageLimit} messages used today</span>
                  <span>{Math.round((user?.messagesUsed / user?.messageLimit) * 100)}%</span>
                </div>
                <Progress value={(user?.messagesUsed / user?.messageLimit) * 100} className="h-2" indicatorClassName={planInfo?.progressColor} />
              </div>
            </div>

            {/* Integration Options */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-lg font-medium mb-4">{t("dashboard.integration")}</h2>
              <div className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full justify-start" 
                  onClick={() => { 
                    setActiveTab("integration");
                    generateApiKey(); 
                  }}
                >
                  <Key className="mr-2 h-4 w-4" />
                  {t("dashboard.generateKey")}
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => {
                    setActiveTab("integration");
                    toast.success("SDK downloaded successfully");
                  }}
                >
                  <Download className="mr-2 h-4 w-4" />
                  {t("dashboard.downloadSDK")}
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => setActiveTab("integration")}
                >
                  <Copy className="mr-2 h-4 w-4" />
                  {t("dashboard.embedCode")}
                </Button>
              </div>
            </div>

            {/* Available Chatbots */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-lg font-medium mb-4">{t("dashboard.chooseChatbot")}</h2>
              <div className="grid grid-cols-2 gap-3">
                {chatbots.slice(0, 6).map((chatbot) => (
                  <div
                    key={chatbot.id}
                    className={`p-3 rounded-md cursor-pointer border transition-all ${
                      selectedChatbot.id === chatbot.id
                        ? "border-primary bg-primary-light"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => setSelectedChatbot(chatbot)}
                  >
                    <div className={`${chatbot.color} h-8 w-8 rounded-full flex items-center justify-center mb-2`}>
                      {chatbot.icon}
                    </div>
                    <p className="font-medium text-sm truncate">{chatbot.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main content area */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-md">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
              <div className="border-b px-6 py-3">
                <TabsList className="grid grid-cols-2">
                  <TabsTrigger value="chat" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Chat
                  </TabsTrigger>
                  <TabsTrigger value="integration" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                    <Code className="h-4 w-4 mr-2" />
                    Integration
                  </TabsTrigger>
                </TabsList>
              </div>

              {/* Chat Tab */}
              <TabsContent value="chat" className="flex flex-col h-[600px]">
                {/* Chat header */}
                <div className="p-4 border-b flex items-center">
                  <div className={`${selectedChatbot.color} h-10 w-10 rounded-full flex items-center justify-center mr-3`}>
                    {selectedChatbot.icon}
                  </div>
                  <div>
                    <h3 className="font-medium">{selectedChatbot.name}</h3>
                    <p className="text-gray-600 text-sm">{selectedChatbot.description}</p>
                  </div>
                </div>

                {/* Chat messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-3/4 rounded-lg p-3 ${
                          msg.sender === "user"
                            ? "bg-primary text-white"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        <p>{msg.content}</p>
                        <p className="text-xs opacity-70 mt-1">
                          {msg.timestamp.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Chat input */}
                <form onSubmit={sendMessage} className="border-t p-4 flex">
                  <Input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="mr-2"
                  />
                  <Button type="submit">
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </TabsContent>

              {/* Integration Tab */}
              <TabsContent value="integration" className="p-6 h-[600px] overflow-y-auto">
                <h2 className="text-2xl font-bold mb-6">Integration Options</h2>
                
                {/* API Key Section */}
                <div className="mb-8">
                  <h3 className="text-lg font-medium mb-3">API Key</h3>
                  <p className="text-gray-600 mb-4">
                    Use this API key to authenticate your requests to the ChatBoost API.
                  </p>
                  
                  <div className="flex items-center mb-4">
                    <Input
                      value={apiKey || "No API key generated"}
                      readOnly
                      className="font-mono"
                    />
                    <Button 
                      variant="outline" 
                      className="ml-2 whitespace-nowrap"
                      onClick={() => apiKey && copyToClipboard(apiKey, "API key copied to clipboard")}
                      disabled={!apiKey}
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      Copy
                    </Button>
                  </div>
                  
                  <Button 
                    onClick={generateApiKey}
                    disabled={isGeneratingKey}
                  >
                    {isGeneratingKey ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Key className="h-4 w-4 mr-2" />
                        Generate New API Key
                      </>
                    )}
                  </Button>
                </div>
                
                {/* API Example */}
                <div className="mb-8">
                  <h3 className="text-lg font-medium mb-3">API Example</h3>
                  <p className="text-gray-600 mb-4">
                    Here's how to use the ChatBoost API to send messages to a chatbot.
                  </p>
                  
                  <div className="bg-gray-900 text-gray-100 p-4 rounded-md font-mono text-sm mb-4 overflow-x-auto">
                    <pre>{`fetch('https://api.chatboost.ai/v1/chat', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ${apiKey || 'YOUR_API_KEY'}'
  },
  body: JSON.stringify({
    botId: '${selectedChatbot.id}',
    message: 'Hello, can you help me?'
  })
})
.then(response => response.json())
.then(data => console.log(data));`}</pre>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    onClick={() => copyToClipboard(
                      `fetch('https://api.chatboost.ai/v1/chat', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ${apiKey || 'YOUR_API_KEY'}'
  },
  body: JSON.stringify({
    botId: '${selectedChatbot.id}',
    message: 'Hello, can you help me?'
  })
})
.then(response => response.json())
.then(data => console.log(data));`,
                      "Code snippet copied to clipboard"
                    )}
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Code
                  </Button>
                </div>
                
                {/* Embed Widget */}
                <div>
                  <h3 className="text-lg font-medium mb-3">Embed Widget</h3>
                  <p className="text-gray-600 mb-4">
                    Add this code to your website to embed the ChatBoost widget.
                  </p>
                  
                  <div className="bg-gray-900 text-gray-100 p-4 rounded-md font-mono text-sm mb-4 overflow-x-auto">
                    <pre>{`<script src="https://cdn.chatboost.ai/widget.js"></script>
<script>
  ChatBoost.init({
    apiKey: '${apiKey || 'YOUR_API_KEY'}',
    botId: '${selectedChatbot.id}',
    theme: 'light',
    position: 'bottom-right'
  });
</script>`}</pre>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    onClick={() => copyToClipboard(
                      `<script src="https://cdn.chatboost.ai/widget.js"></script>
<script>
  ChatBoost.init({
    apiKey: '${apiKey || 'YOUR_API_KEY'}',
    botId: '${selectedChatbot.id}',
    theme: 'light',
    position: 'bottom-right'
  });
</script>`,
                      "Widget code copied to clipboard"
                    )}
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Code
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

// Icon for Integration Tab
const Code = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polyline points="16 18 22 12 16 6"></polyline>
    <polyline points="8 6 2 12 8 18"></polyline>
  </svg>
);

export default Dashboard;
