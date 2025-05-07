# Mood Tracking App

A modern web application that helps users track their emotional wellbeing, sleep patterns, and personal reflections over time. Built with Next.js, TypeScript, and Tailwind CSS.

## Features

- **Daily Mood Logging**: Record your mood, feelings, reflections, and sleep each day
- **Today's Overview**: View your current day's mood, feelings, reflection, and sleep data
- **Personalized Quotes**: See relevant mood quotes based on your current emotional state
- **Trend Visualization**: Interactive graph showing your recent mood and sleep patterns
- **Interactive Charts**: Click on chart bars to see detailed information for specific days
- **Statistical Insights**: View your mood and sleep patterns with detailed analytics
- **Secure Authentication**: User authentication with robust security measures
- **Profile Management**: Manage your profile with secure image handling
- **Data Privacy**: Enterprise-grade security for user data protection
- **Responsive Design**: Fully responsive interface that works on all devices

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS
- **Design System**: Custom UI components
- **Data Visualization**: Custom chart components
- **Authentication**: Firebase Authentication
- **Database**: MongoDB
- **State Management**: Zustand
- **API Layer**: Next.js API routes with secure authentication
- **Image Processing**: Client-side image optimization

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or pnpm
- MongoDB database
- Firebase project with Authentication enabled

### Development Setup

1. Clone the repository
```bash
git clone https://github.com/yourusername/mood-app.git
cd mood-app
```

2. Install dependencies
```bash
npm install
# or
pnpm install
```

3. Configure Environment Variables
Create a `.env.local` file based on `.env.example` (see Environment Setup section below)

4. Start Development Server
```bash
npm run dev
# or
pnpm dev
```

The development server will be available at [http://localhost:3000](http://localhost:3000)

## Environment Setup

For security reasons, environment variables are not shared publicly. You'll need to:

1. Create a `.env.example` file in your project root (see below)
2. Set up your own Firebase project and MongoDB instance
3. Configure security rules for Firebase
4. Set up proper authentication mechanisms

Contact the project maintainers for detailed setup instructions.

## Security Measures

This application implements several security best practices:

- Secure user authentication
- API rate limiting
- Request validation
- CORS protection
- Environment variable validation
- Data encryption
- Secure image handling
- Database access controls

## Production Deployment

For production deployment guidelines and security considerations, please contact the project maintainers.

