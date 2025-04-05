
/**
 * Mock Backend Server for ChatBoost
 * 
 * This file represents a mock implementation of a Node.js Express backend server.
 * In a real implementation, this would be a separate project running on a server.
 */

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = 'your-jwt-secret-key'; // In production, use environment variables

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Database mock (in-memory)
const db = {
  users: [
    {
      id: '1',
      name: 'Demo User',
      email: 'demo@example.com',
      password: '$2b$10$X7EfDm0Vufv0VrQ8Ufg1t.dKMnY7NyB7z8I4NnvFdY0jW87IFkAZO', // hashed 'password'
      plan: 'free',
      messagesUsed: 5,
      messageLimit: 10,
      apiKey: 'cb_demo_key_123456',
    },
    {
      id: '2',
      name: 'Premium User',
      email: 'premium@example.com',
      password: '$2b$10$X7EfDm0Vufv0VrQ8Ufg1t.dKMnY7NyB7z8I4NnvFdY0jW87IFkAZO', // hashed 'password'
      plan: 'individual',
      messagesUsed: 8,
      messageLimit: 15,
      apiKey: 'cb_premium_key_789012',
    },
  ],
  
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
  ],
  
  messages: [],
  feedback: [],
  contactRequests: [],
};

// Authentication middleware
const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    return res.status(401).json({ error: 'Authorization header missing' });
  }
  
  const token = authHeader.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'Token missing' });
  }
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

// API key authentication middleware
const authenticateApiKey = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  
  if (!apiKey) {
    return res.status(401).json({ error: 'API key missing' });
  }
  
  const user = db.users.find(user => user.apiKey === apiKey);
  
  if (!user) {
    return res.status(401).json({ error: 'Invalid API key' });
  }
  
  req.user = user;
  next();
};

// Routes

// Auth routes
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  
  const user = db.users.find(user => user.email === email);
  
  if (!user) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }
  
  try {
    // In a real app, use bcrypt.compare
    const isPasswordValid = true; // Mock password validation
    
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    
    // Create a JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name },
      JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    // Return user info (without password) and token
    const { password: _, ...userWithoutPassword } = user;
    
    res.json({
      user: userWithoutPassword,
      token,
    });
    
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/auth/signup', async (req, res) => {
  const { name, email, password } = req.body;
  
  // Check if user already exists
  if (db.users.some(user => user.email === email)) {
    return res.status(400).json({ error: 'Email already exists' });
  }
  
  try {
    // In a real app, hash the password with bcrypt
    const hashedPassword = 'hashed_password'; // Mock hashed password
    
    // Generate a new user ID
    const id = (db.users.length + 1).toString();
    
    // Create new user
    const newUser = {
      id,
      name,
      email,
      password: hashedPassword,
      plan: 'free',
      messagesUsed: 0,
      messageLimit: 10,
      apiKey: `cb_${Math.random().toString(36).substring(2, 10)}`,
    };
    
    // Add user to database
    db.users.push(newUser);
    
    // Create a JWT token
    const token = jwt.sign(
      { id: newUser.id, email: newUser.email, name: newUser.name },
      JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    // Return user info (without password) and token
    const { password: _, ...userWithoutPassword } = newUser;
    
    res.status(201).json({
      user: userWithoutPassword,
      token,
    });
    
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/auth/reset-password', (req, res) => {
  const { email } = req.body;
  
  // Check if user exists
  const user = db.users.find(user => user.email === email);
  
  if (!user) {
    // For security reasons, still return success even if email doesn't exist
    return res.json({ message: 'If your email exists in our system, you will receive a reset link' });
  }
  
  // In a real app, generate a reset token and send an email
  
  res.json({ message: 'If your email exists in our system, you will receive a reset link' });
});

// Chatbot routes
app.get('/api/chatbots', (req, res) => {
  res.json(db.chatbots);
});

app.get('/api/chatbots/:id', (req, res) => {
  const chatbotId = req.params.id;
  const chatbot = db.chatbots.find(bot => bot.id === chatbotId);
  
  if (!chatbot) {
    return res.status(404).json({ error: 'Chatbot not found' });
  }
  
  res.json(chatbot);
});

app.post('/api/chat', authenticateApiKey, (req, res) => {
  const { botId, message } = req.body;
  
  // Check if chatbot exists
  const chatbot = db.chatbots.find(bot => bot.id === botId);
  
  if (!chatbot) {
    return res.status(404).json({ error: 'Chatbot not found' });
  }
  
  // Check message limit
  if (req.user.messagesUsed >= req.user.messageLimit) {
    return res.status(403).json({ error: 'Message limit reached' });
  }
  
  // Update message count
  const userIndex = db.users.findIndex(user => user.id === req.user.id);
  if (userIndex !== -1) {
    db.users[userIndex].messagesUsed += 1;
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
  
  // Save the message
  const newMessage = {
    id: `msg_${Date.now()}`,
    userId: req.user.id,
    botId,
    content: message,
    response,
    timestamp: new Date().toISOString(),
  };
  
  db.messages.push(newMessage);
  
  // Return the bot's response
  res.json({
    id: newMessage.id,
    botId,
    message: response,
    timestamp: newMessage.timestamp,
  });
});

// User routes
app.get('/api/user', authenticate, (req, res) => {
  const userId = req.user.id;
  const user = db.users.find(user => user.id === userId);
  
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  
  // Return user info without password
  const { password, ...userWithoutPassword } = user;
  
  res.json(userWithoutPassword);
});

app.post('/api/user/api-key', authenticate, (req, res) => {
  const userId = req.user.id;
  const userIndex = db.users.findIndex(user => user.id === userId);
  
  if (userIndex === -1) {
    return res.status(404).json({ error: 'User not found' });
  }
  
  // Generate a new API key
  const newApiKey = `cb_${Math.random().toString(36).substring(2, 15)}_${Math.random().toString(36).substring(2, 15)}`;
  
  // Update user's API key
  db.users[userIndex].apiKey = newApiKey;
  
  res.json({ apiKey: newApiKey });
});

// Feedback route
app.post('/api/feedback', (req, res) => {
  const { name, email, message, subscribe } = req.body;
  
  // Validate input
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required' });
  }
  
  // Save feedback
  const feedback = {
    id: `feedback_${Date.now()}`,
    name,
    email,
    message,
    subscribe: !!subscribe,
    timestamp: new Date().toISOString(),
  };
  
  db.feedback.push(feedback);
  
  res.json({ success: true, message: 'Feedback submitted successfully' });
});

// Contact route
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;
  
  // Validate input
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required' });
  }
  
  // Save contact request
  const contactRequest = {
    id: `contact_${Date.now()}`,
    name,
    email,
    message,
    timestamp: new Date().toISOString(),
  };
  
  db.contactRequests.push(contactRequest);
  
  res.json({ success: true, message: 'Contact request submitted successfully' });
});

// Subscription route
app.post('/api/subscribe', authenticate, (req, res) => {
  const userId = req.user.id;
  const { plan } = req.body;
  
  // Validate plan
  if (!['free', 'individual', 'group', 'lifetime'].includes(plan)) {
    return res.status(400).json({ error: 'Invalid plan' });
  }
  
  const userIndex = db.users.findIndex(user => user.id === userId);
  
  if (userIndex === -1) {
    return res.status(404).json({ error: 'User not found' });
  }
  
  // Update user's plan and message limits
  let messageLimit;
  
  switch (plan) {
    case 'free':
      messageLimit = 10;
      break;
    case 'individual':
      messageLimit = 15;
      break;
    case 'group':
      messageLimit = 30;
      break;
    case 'lifetime':
      messageLimit = Infinity;
      break;
  }
  
  db.users[userIndex].plan = plan;
  db.users[userIndex].messageLimit = messageLimit;
  db.users[userIndex].messagesUsed = 0; // Reset message count
  
  // Return updated user info without password
  const { password, ...userWithoutPassword } = db.users[userIndex];
  
  res.json({
    success: true,
    message: 'Subscription updated successfully',
    user: userWithoutPassword,
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Mock server running on port ${PORT}`);
});

/**
 * Database Schema (for PostgreSQL in a real application)
 * 
 * -- Users table
 * CREATE TABLE users (
 *   id SERIAL PRIMARY KEY,
 *   name VARCHAR(255) NOT NULL,
 *   email VARCHAR(255) UNIQUE NOT NULL,
 *   password VARCHAR(255) NOT NULL,
 *   plan VARCHAR(50) DEFAULT 'free',
 *   messages_used INTEGER DEFAULT 0,
 *   message_limit INTEGER DEFAULT 10,
 *   api_key VARCHAR(255) UNIQUE,
 *   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 *   updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
 * );
 * 
 * -- Chatbots table
 * CREATE TABLE chatbots (
 *   id VARCHAR(50) PRIMARY KEY,
 *   name VARCHAR(255) NOT NULL,
 *   description TEXT,
 *   category VARCHAR(50),
 *   icon_url VARCHAR(255),
 *   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 *   updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
 * );
 * 
 * -- Messages table
 * CREATE TABLE messages (
 *   id SERIAL PRIMARY KEY,
 *   user_id INTEGER REFERENCES users(id),
 *   bot_id VARCHAR(50) REFERENCES chatbots(id),
 *   content TEXT NOT NULL,
 *   response TEXT,
 *   timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
 * );
 * 
 * -- Feedback table
 * CREATE TABLE feedback (
 *   id SERIAL PRIMARY KEY,
 *   name VARCHAR(255) NOT NULL,
 *   email VARCHAR(255) NOT NULL,
 *   message TEXT NOT NULL,
 *   subscribe BOOLEAN DEFAULT FALSE,
 *   timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
 * );
 * 
 * -- Contact requests table
 * CREATE TABLE contact_requests (
 *   id SERIAL PRIMARY KEY,
 *   name VARCHAR(255) NOT NULL,
 *   email VARCHAR(255) NOT NULL,
 *   message TEXT NOT NULL,
 *   timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
 * );
 */
