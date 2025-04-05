
/**
 * Mock API Client for ChatBoost
 * 
 * This is a placeholder implementation that simulates API calls to a backend server.
 * In a production environment, this would be replaced with actual API calls to a server.
 */

// Types
export interface Chatbot {
  id: string;
  name: string;
  description: string;
  category: string;
  iconUrl: string;
}

export interface Message {
  id: string;
  botId: string;
  content: string;
  timestamp: string;
  sender: 'user' | 'bot';
}

export interface User {
  id: string;
  name: string;
  email: string;
  plan: 'free' | 'individual' | 'group' | 'lifetime';
  messagesUsed: number;
  messageLimit: number;
}

// Mock data
const mockChatbots: Chatbot[] = [
  {
    id: 'motivation',
    name: 'Motivation Coach',
    description: 'Daily motivation and personalized coaching',
    category: 'personal',
    iconUrl: '/icons/motivation.svg',
  },
  {
    id: 'productivity',
    name: 'Productivity Assistant',
    description: 'Task management and productivity tips',
    category: 'work',
    iconUrl: '/icons/productivity.svg',
  },
  {
    id: 'language',
    name: 'Language Tutor',
    description: 'Learn new languages with interactive lessons',
    category: 'education',
    iconUrl: '/icons/language.svg',
  },
  {
    id: 'support',
    name: 'Customer Support',
    description: '24/7 automated support for your customers',
    category: 'business',
    iconUrl: '/icons/support.svg',
  },
  // Add more chatbots as needed
];

// Mock API functions

/**
 * Get all available chatbots
 */
export const getChatbots = async (): Promise<Chatbot[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  return mockChatbots;
};

/**
 * Get a specific chatbot by ID
 */
export const getChatbotById = async (id: string): Promise<Chatbot> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));
  
  const chatbot = mockChatbots.find((bot) => bot.id === id);
  
  if (!chatbot) {
    throw new Error(`Chatbot with ID ${id} not found`);
  }
  
  return chatbot;
};

/**
 * Send a message to a chatbot
 */
export const sendMessage = async (botId: string, message: string): Promise<Message> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
  
  // Check if chatbot exists
  const chatbot = mockChatbots.find((bot) => bot.id === botId);
  if (!chatbot) {
    throw new Error(`Chatbot with ID ${botId} not found`);
  }
  
  // Generate a mock response based on the chatbot type
  let response = '';
  
  switch (botId) {
    case 'motivation':
      response = "You're doing great! Remember that every step forward counts, no matter how small.";
      break;
    case 'productivity':
      response = "Have you tried using the Pomodoro technique? 25 minutes of focused work followed by a 5-minute break.";
      break;
    case 'language':
      response = "Great! Let's practice some common phrases in Spanish. Repeat after me: '¿Cómo estás hoy?' (How are you today?)";
      break;
    case 'support':
      response = "I'm happy to help with your question. Could you provide more details about the issue you're experiencing?";
      break;
    default:
      response = "That's interesting! How can I assist you further with this?";
  }
  
  return {
    id: `msg_${Date.now()}`,
    botId,
    content: response,
    timestamp: new Date().toISOString(),
    sender: 'bot',
  };
};

/**
 * Generate an API key
 */
export const generateApiKey = async (): Promise<string> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1500));
  
  // Generate a random API key
  const key = `cb_${Math.random().toString(36).substring(2, 15)}_${Math.random().toString(36).substring(2, 15)}`;
  return key;
};

/**
 * Get user information
 */
export const getUserInfo = async (userId: string): Promise<User> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  
  // In a real app, this would fetch user data from the backend
  return {
    id: userId,
    name: 'Demo User',
    email: 'demo@example.com',
    plan: 'free',
    messagesUsed: 5,
    messageLimit: 10,
  };
};

/**
 * Submit feedback
 */
export const submitFeedback = async (name: string, email: string, message: string, subscribe: boolean): Promise<boolean> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1500));
  
  // In a real app, this would send the feedback to the backend
  console.log('Feedback submitted:', { name, email, message, subscribe });
  
  return true;
};

/**
 * Contact form submission
 */
export const submitContactForm = async (name: string, email: string, message: string): Promise<boolean> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1500));
  
  // In a real app, this would send the contact form data to the backend
  console.log('Contact form submitted:', { name, email, message });
  
  return true;
};

/**
 * Subscribe to a plan
 */
export const subscribeToPlan = async (planId: string, userId: string): Promise<boolean> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 2000));
  
  // In a real app, this would update the user's plan in the backend
  console.log(`User ${userId} subscribed to plan ${planId}`);
  
  return true;
};

// Export the API client
export default {
  getChatbots,
  getChatbotById,
  sendMessage,
  generateApiKey,
  getUserInfo,
  submitFeedback,
  submitContactForm,
  subscribeToPlan,
};
