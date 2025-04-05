
import React, { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Database, Lock, Users, MessageSquare } from "lucide-react";

interface FeedbackEntry {
  id: string;
  name: string;
  email: string;
  message: string;
  subscribe: boolean;
  timestamp: string;
}

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [feedbackData, setFeedbackData] = useState<FeedbackEntry[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [contactRequests, setContactRequests] = useState<any[]>([]);

  // Admin authorization check
  useEffect(() => {
    if (!user || user.email !== "kaushikrawal4365@gmail.com") {
      navigate("/");
    }
  }, [user, navigate]);

  // Load all data from localStorage
  useEffect(() => {
    // Load feedback data
    const storedFeedback = localStorage.getItem("feedback_history");
    if (storedFeedback) {
      try {
        setFeedbackData(JSON.parse(storedFeedback));
      } catch (error) {
        console.error("Failed to parse stored feedback:", error);
      }
    }

    // Mock users data (in a real app, this would come from a database)
    setUsers([
      {
        id: "1",
        name: "Demo User",
        email: "demo@example.com",
        plan: "free",
        messagesUsed: 5,
        messageLimit: 10,
        registrationDate: "2023-06-10T14:30:00Z"
      },
      {
        id: "2",
        name: "Premium User",
        email: "premium@example.com",
        plan: "individual",
        messagesUsed: 8,
        messageLimit: 15,
        registrationDate: "2023-05-22T09:15:00Z"
      },
      {
        id: "3",
        name: "Kaushik Rawal",
        email: "kaushikrawal4365@gmail.com",
        plan: "lifetime",
        messagesUsed: 0,
        messageLimit: Infinity,
        registrationDate: "2023-04-01T00:00:00Z",
        isAdmin: true
      }
    ]);

    // Mock contact requests (in a real app, this would come from a database)
    setContactRequests([
      {
        id: "contact_1",
        name: "Jane Smith",
        email: "jane@example.com",
        message: "I'm interested in using your chatbots for my business.",
        timestamp: "2023-06-14T10:30:00Z"
      },
      {
        id: "contact_2",
        name: "John Doe",
        email: "john@example.com",
        message: "Can you provide more information about the pricing plans?",
        timestamp: "2023-06-10T15:45:00Z"
      }
    ]);
  }, []);

  // Format date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-gray-500">Welcome, {user?.name}</p>
        </div>
        <Button onClick={() => navigate("/dashboard")} className="mt-4 md:mt-0">
          Back to User Dashboard
        </Button>
      </div>

      <Tabs defaultValue="feedback" className="w-full">
        <TabsList className="grid grid-cols-3 mb-8">
          <TabsTrigger value="feedback" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" /> Feedback
          </TabsTrigger>
          <TabsTrigger value="users" className="flex items-center gap-2">
            <Users className="h-4 w-4" /> Users
          </TabsTrigger>
          <TabsTrigger value="contacts" className="flex items-center gap-2">
            <Database className="h-4 w-4" /> Contact Requests
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="feedback">
          <Card>
            <CardHeader>
              <CardTitle>Feedback Submissions</CardTitle>
              <CardDescription>
                View all feedback submissions from users
              </CardDescription>
            </CardHeader>
            <CardContent>
              {feedbackData.length > 0 ? (
                <div className="space-y-6">
                  {feedbackData.map((entry) => (
                    <div key={entry.id} className="bg-gray-50 p-4 rounded-md border">
                      <div className="flex justify-between mb-2">
                        <span className="font-medium">{entry.name}</span>
                        <span className="text-sm text-gray-500">
                          {formatDate(entry.timestamp)}
                        </span>
                      </div>
                      <div className="text-sm text-gray-500 mb-2">{entry.email}</div>
                      <div className="text-gray-700 mb-2">{entry.message}</div>
                      {entry.subscribe && (
                        <Badge variant="outline" className="bg-blue-50 text-blue-600">
                          Subscribed to marketing
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center py-8 text-gray-500">No feedback submissions yet.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>Registered Users</CardTitle>
              <CardDescription>
                View all users registered in the system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border p-2 text-left">Name</th>
                      <th className="border p-2 text-left">Email</th>
                      <th className="border p-2 text-left">Plan</th>
                      <th className="border p-2 text-left">Messages</th>
                      <th className="border p-2 text-left">Registered</th>
                      <th className="border p-2 text-left">Role</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id}>
                        <td className="border p-2">{user.name}</td>
                        <td className="border p-2">{user.email}</td>
                        <td className="border p-2 capitalize">{user.plan}</td>
                        <td className="border p-2">
                          {user.messagesUsed} / {user.messageLimit === Infinity ? "∞" : user.messageLimit}
                        </td>
                        <td className="border p-2">{formatDate(user.registrationDate)}</td>
                        <td className="border p-2">
                          {user.isAdmin ? (
                            <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
                              <Lock className="mr-1 h-3 w-3" /> Admin
                            </Badge>
                          ) : (
                            <Badge variant="outline">User</Badge>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contacts">
          <Card>
            <CardHeader>
              <CardTitle>Contact Requests</CardTitle>
              <CardDescription>
                View all contact form submissions
              </CardDescription>
            </CardHeader>
            <CardContent>
              {contactRequests.length > 0 ? (
                <div className="space-y-6">
                  {contactRequests.map((request) => (
                    <div key={request.id} className="bg-gray-50 p-4 rounded-md border">
                      <div className="flex justify-between mb-2">
                        <span className="font-medium">{request.name}</span>
                        <span className="text-sm text-gray-500">
                          {formatDate(request.timestamp)}
                        </span>
                      </div>
                      <div className="text-sm text-gray-500 mb-2">{request.email}</div>
                      <div className="text-gray-700">{request.message}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center py-8 text-gray-500">No contact requests yet.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
