
import React, { createContext, useState, useEffect, useContext } from "react";
import { toast } from "sonner";

// Define the User type
export interface User {
  id: string;
  name: string;
  email: string;
  plan: "free" | "individual" | "group" | "lifetime";
  messagesUsed: number;
  messageLimit: number;
}

// Define the AuthContext type
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  resetPassword: (email: string) => Promise<void>;
}

// Create the AuthContext
const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => {},
  signup: async () => {},
  logout: () => {},
  resetPassword: async () => {},
});

// Mock user data for demonstration
const mockUsers = [
  {
    id: "1",
    name: "Demo User",
    email: "demo@example.com",
    password: "password", // In a real app, this would be hashed
    plan: "free" as const,
    messagesUsed: 5,
    messageLimit: 10,
  },
  {
    id: "2",
    name: "Premium User",
    email: "premium@example.com",
    password: "password",
    plan: "individual" as const,
    messagesUsed: 8,
    messageLimit: 15,
  },
];

// Create the AuthProvider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error("Failed to parse stored user:", error);
        localStorage.removeItem("user");
      }
    }
    setIsLoading(false);
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Find user with matching email and password
    const foundUser = mockUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (foundUser) {
      // Create a sanitized user object (without password)
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);

      // Store user in localStorage
      localStorage.setItem("user", JSON.stringify(userWithoutPassword));
      toast.success("Logged in successfully");
    } else {
      toast.error("Invalid email or password");
      throw new Error("Invalid email or password");
    }
  };

  // Signup function
  const signup = async (name: string, email: string, password: string) => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Check if user already exists
    if (mockUsers.some((u) => u.email === email)) {
      toast.error("Email already exists");
      throw new Error("Email already exists");
    }

    // Create new user
    const newUser: User = {
      id: `${mockUsers.length + 1}`,
      name,
      email,
      plan: "free",
      messagesUsed: 0,
      messageLimit: 10,
    };

    // Store user in localStorage
    localStorage.setItem("user", JSON.stringify(newUser));
    setUser(newUser);
    toast.success("Account created successfully");

    // In a real app, we would also add the user to our database
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    toast.success("Logged out successfully");
  };

  // Reset password function
  const resetPassword = async (email: string) => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Check if email exists
    const userExists = mockUsers.some((u) => u.email === email);
    if (!userExists) {
      toast.error("Email not found");
      throw new Error("Email not found");
    }

    toast.success("Password reset email sent");
    // In a real app, we would send an email with a reset link
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        signup,
        logout,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for using the auth context
export const useAuth = () => {
  return useContext(AuthContext);
};
