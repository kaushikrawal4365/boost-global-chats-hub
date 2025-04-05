
import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import DatabaseView from "@/components/DatabaseView";
import { getMockData } from "@/lib/db-utils";

const AdminDashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [dbData, setDbData] = useState<any>({
    users: null,
    feedback: null,
    contacts: null,
    chatbots: null,
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  useEffect(() => {
    // Check if user is admin (in this case, Kaushik Rawal)
    if (user && user.email === "kaushikrawal4365@gmail.com") {
      setIsAdmin(true);
      loadData();
    } else {
      toast({
        title: "Access Denied",
        description: "You do not have permission to view this page.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  }, [user, toast]);
  
  const loadData = () => {
    setIsLoading(true);
    
    // In a real application, this would be an API call to the backend
    try {
      const data = getMockData();
      setDbData(data);
    } catch (error) {
      console.error("Error loading data:", error);
      toast({
        title: "Error",
        description: "Failed to load database data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  // If not admin or still checking, redirect or show loading
  if (!isLoading && !isAdmin) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <header className="mb-10">
        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">
          Welcome back, Kaushik Rawal! Here's the current state of your database.
        </p>
      </header>
      
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-pulse flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-blue-200 mb-4"></div>
            <div className="h-4 bg-blue-200 rounded w-24"></div>
            <div className="mt-2 h-3 bg-blue-100 rounded w-32"></div>
          </div>
        </div>
      ) : (
        <Tabs defaultValue="users" className="w-full">
          <TabsList className="mb-8 flex justify-center">
            <TabsTrigger value="users">Users ({dbData.users?.length || 0})</TabsTrigger>
            <TabsTrigger value="feedback">Feedback ({dbData.feedback?.length || 0})</TabsTrigger>
            <TabsTrigger value="contacts">Contact Requests ({dbData.contacts?.length || 0})</TabsTrigger>
            <TabsTrigger value="chatbots">Chatbots ({dbData.chatbots?.length || 0})</TabsTrigger>
          </TabsList>
          
          <TabsContent value="users">
            <DatabaseView 
              title="All Users" 
              data={dbData.users} 
              type="users" 
            />
            <div className="text-right">
              <p className="text-gray-500 text-sm">
                Data is currently stored in localStorage for demo purposes.
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="feedback">
            <DatabaseView 
              title="Customer Feedback" 
              data={dbData.feedback} 
              type="feedback" 
            />
          </TabsContent>
          
          <TabsContent value="contacts">
            <DatabaseView 
              title="Contact Requests" 
              data={dbData.contacts} 
              type="contacts" 
            />
          </TabsContent>
          
          <TabsContent value="chatbots">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold mb-6">Available Chatbots</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {dbData.chatbots?.map((bot: any, index: number) => (
                  <div key={index} className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                    <div className="p-4 bg-blue-50 flex items-center">
                      <div className="mr-4 bg-blue-500 text-white p-2 rounded-full">
                        🤖
                      </div>
                      <div>
                        <h4 className="font-bold">{bot.name}</h4>
                        <p className="text-xs text-gray-500">{bot.category}</p>
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="text-sm">{bot.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default AdminDashboard;
