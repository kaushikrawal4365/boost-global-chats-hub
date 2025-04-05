import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Settings, MessageSquare, Bot, Key, Plus, ArrowRight, Loader2 } from "lucide-react";
import { toast } from "sonner";

// Mock chatbot data
const chatbots = [
  {
    id: "motivation",
    name: "Motivation Coach",
    description: "Daily motivation and personalized coaching",
    category: "personal",
    iconUrl: "/icons/motivation.svg",
  },
  {
    id: "productivity",
    name: "Productivity Assistant",
    description: "Task management and productivity tips",
    category: "work",
    iconUrl: "/icons/productivity.svg",
  },
  {
    id: "language",
    name: "Language Tutor",
    description: "Learn new languages with interactive lessons",
    category: "education",
    iconUrl: "/icons/language.svg",
  },
];

// Mock conversation history
const conversationHistory = [
  {
    id: "conv1",
    botId: "motivation",
    botName: "Motivation Coach",
    lastMessage: "Remember, every small step counts toward your goal!",
    timestamp: "2023-06-15T10:30:00Z",
  },
  {
    id: "conv2",
    botId: "productivity",
    botName: "Productivity Assistant",
    lastMessage: "I've set a reminder for your meeting tomorrow at 2 PM.",
    timestamp: "2023-06-14T16:45:00Z",
  },
];

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isGeneratingKey, setIsGeneratingKey] = useState(false);
  const [apiKey, setApiKey] = useState<string | null>(null);

  // Redirect if not authenticated
  if (!user) {
    navigate("/login");
    return null;
  }

  const { messagesUsed, messageLimit, plan } = user;

  const handleGenerateApiKey = () => {
    setIsGeneratingKey(true);
    
    // Simulate API call
    setTimeout(() => {
      const newApiKey = `cb_${Math.random().toString(36).substring(2, 15)}_${Math.random().toString(36).substring(2, 15)}`;
      setApiKey(newApiKey);
      setIsGeneratingKey(false);
      toast.success("API key generated successfully");
    }, 1500);
  };

  const handleCopyApiKey = () => {
    if (apiKey) {
      navigator.clipboard.writeText(apiKey);
      toast.success("API key copied to clipboard");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-gray-500">Welcome back, {user.name}</p>
        </div>
        <Button variant="outline" onClick={logout} className="mt-4 md:mt-0">
          Logout
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageSquare className="mr-2 h-5 w-5" />
              Message Usage
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">
                  {messagesUsed} / {messageLimit} messages
                </span>
                <span className="text-sm font-medium">
                  {Math.round((messagesUsed / messageLimit) * 100)}%
                </span>
              </div>
              <Progress value={(messagesUsed / messageLimit) * 100} className="h-2" />
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" onClick={() => navigate("/pricing")}>
              Upgrade Plan
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Settings className="mr-2 h-5 w-5" />
              Current Plan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold capitalize">{plan}</p>
                <p className="text-sm text-gray-500">
                  {plan === "free"
                    ? "Basic access with limited messages"
                    : "Full access with premium features"}
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" onClick={() => navigate("/pricing")}>
              View Plans
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Key className="mr-2 h-5 w-5" />
              API Access
            </CardTitle>
          </CardHeader>
          <CardContent>
            {apiKey ? (
              <div className="bg-gray-100 p-3 rounded-md font-mono text-sm break-all">
                {apiKey}
              </div>
            ) : (
              <p className="text-sm text-gray-500">
                Generate an API key to integrate ChatBoost with your applications.
              </p>
            )}
          </CardContent>
          <CardFooter className="flex gap-2">
            <Button
              variant="outline"
              className="flex-1"
              onClick={handleGenerateApiKey}
              disabled={isGeneratingKey}
            >
              {isGeneratingKey ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                "Generate Key"
              )}
            </Button>
            {apiKey && (
              <Button variant="secondary" className="flex-1" onClick={handleCopyApiKey}>
                Copy Key
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>

      <Tabs defaultValue="chatbots" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="chatbots">My Chatbots</TabsTrigger>
          <TabsTrigger value="conversations">Recent Conversations</TabsTrigger>
        </TabsList>
        
        <TabsContent value="chatbots">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {chatbots.map((bot) => (
              <Card key={bot.id}>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Bot className="mr-2 h-5 w-5" />
                    {bot.name}
                  </CardTitle>
                  <CardDescription>{bot.description}</CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button className="w-full">
                    Chat Now <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
            
            <Card className="border-dashed">
              <CardHeader>
                <CardTitle className="text-center text-gray-500">Add New Chatbot</CardTitle>
              </CardHeader>
              <CardContent className="flex justify-center">
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                  <Plus className="h-6 w-6 text-gray-500" />
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Browse Chatbots
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="conversations">
          <div className="space-y-4">
            {conversationHistory.map((conv) => (
              <Card key={conv.id}>
                <CardHeader>
                  <CardTitle className="text-lg">{conv.botName}</CardTitle>
                  <CardDescription>
                    {new Date(conv.timestamp).toLocaleString()}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">{conv.lastMessage}</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Continue Conversation
                  </Button>
                </CardFooter>
              </Card>
            ))}
            
            {conversationHistory.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">No conversation history yet.</p>
                <Button className="mt-4">Start a New Conversation</Button>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
