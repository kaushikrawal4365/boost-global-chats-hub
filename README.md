
# ChatBoost - AI-Powered Chatbot Platform

ChatBoost is a comprehensive platform for accessing and integrating 50+ AI-powered chatbots for motivation, productivity, learning, customer support, and more.

## Features

- Access to 50+ specialized AI chatbots
- Multi-language support (English, Spanish, French)
- User authentication system
- Dashboard for interacting with chatbots
- Subscription plans with different tiers
- API integration for developers
- Embeddable chat widgets for websites

## Technology Stack

### Frontend
- React
- TypeScript
- Tailwind CSS
- shadcn/ui components
- React Router for navigation
- React Query for data fetching
- i18n for internationalization

### Backend (Placeholder)
- Node.js with Express (mock implementation provided)
- RESTful API design
- JWT authentication
- PostgreSQL database schema (SQL included in comments)

## Getting Started

### Prerequisites

- Node.js 16+ and npm

### Installation

1. Clone the repository
```sh
git clone <repository-url>
cd chatboost
```

2. Install dependencies
```sh
npm install
```

3. Start the development server
```sh
npm run dev
```

The application will be available at `http://localhost:8080`

## Project Structure

```
chatboost/
├── public/            # Static assets
├── src/
│   ├── components/    # Reusable UI components
│   ├── contexts/      # React contexts for state management
│   ├── lib/           # Utility functions and API client
│   ├── pages/         # Page components
│   ├── App.tsx        # Main application component
│   ├── index.css      # Global styles
│   └── main.tsx       # Application entry point
├── package.json       # Project dependencies
├── tailwind.config.ts # Tailwind CSS configuration
└── README.md          # Project documentation
```

## Authentication

The application includes a complete authentication flow:
- Sign up
- Login
- Password recovery
- JWT token-based authentication

For demo purposes, you can use these credentials:
- Email: demo@example.com
- Password: password

## API Usage

The project includes a mock API client (`src/lib/api-mock.ts`) and a mock backend implementation (`src/lib/backend-mock.js`) to demonstrate how to integrate with a real backend.

### Example API Request:

```typescript
// Send a message to a chatbot
const response = await fetch('https://api.chatboost.ai/v1/chat', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_API_KEY'
  },
  body: JSON.stringify({
    botId: 'productivity',
    message: 'How can I improve my focus?'
  })
});
```

## Internationalization

The application supports multiple languages with a simple language switcher. Translations are stored in the LanguageContext component.

## Integration Options

ChatBoost offers multiple integration options for developers:
- RESTful API
- JavaScript SDK
- Embeddable widget

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the beautiful UI components
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [React Router](https://reactrouter.com/) for routing
- [React Query](https://tanstack.com/query) for data fetching
