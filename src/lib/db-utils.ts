
// Mock database functions to simulate retrieving data from the backend

// Get mock data from localStorage if available, otherwise use default data
export const getMockData = () => {
  const getMockUsers = () => {
    const defaultUsers = [
      {
        id: '1',
        name: 'Demo User',
        email: 'demo@example.com',
        password: 'hashed_password',
        plan: 'free',
        messagesUsed: 5,
        messageLimit: 10,
        apiKey: 'cb_demo_key_123456',
      },
      {
        id: '2',
        name: 'Premium User',
        email: 'premium@example.com',
        password: 'hashed_password',
        plan: 'individual',
        messagesUsed: 8,
        messageLimit: 15,
        apiKey: 'cb_premium_key_789012',
      },
      {
        id: '3',
        name: 'Kaushik Rawal',
        email: 'kaushikrawal4365@gmail.com',
        password: 'hashed_password',
        plan: 'lifetime',
        messagesUsed: 0,
        messageLimit: Infinity,
        apiKey: 'cb_admin_key_special',
      }
    ];

    try {
      const storedUsers = localStorage.getItem('users');
      return storedUsers ? JSON.parse(storedUsers) : defaultUsers;
    } catch (error) {
      console.error('Error loading users from localStorage:', error);
      return defaultUsers;
    }
  };

  const getMockFeedback = () => {
    const defaultFeedback = [];
    
    try {
      const storedFeedback = localStorage.getItem('feedback_history');
      return storedFeedback ? JSON.parse(storedFeedback) : defaultFeedback;
    } catch (error) {
      console.error('Error loading feedback from localStorage:', error);
      return defaultFeedback;
    }
  };

  const getMockContacts = () => {
    const defaultContacts = [];
    
    try {
      const storedContacts = localStorage.getItem('contact_requests');
      return storedContacts ? JSON.parse(storedContacts) : defaultContacts;
    } catch (error) {
      console.error('Error loading contacts from localStorage:', error);
      return defaultContacts;
    }
  };

  return {
    users: getMockUsers(),
    feedback: getMockFeedback(),
    contacts: getMockContacts(),
    chatbots: [
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
    ]
  };
};
