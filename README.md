# Mood Tracking App

A modern web application that helps users track their emotional wellbeing, sleep patterns, and personal reflections over time. Built with Next.js, TypeScript, and Tailwind CSS.

## Features

- **Secure Authentication**: User authentication powered by Firebase Auth
- **Daily Mood Logging**: Record your mood, feelings, reflections, and sleep each day
- **Today's Overview**: View your current day's mood, feelings, reflection, and sleep data
- **Personalized Quotes**: See relevant mood quotes based on your current emotional state
- **Trend Visualization**: Interactive graph showing your most recent mood and sleep patterns
- **Interactive Charts**: Click on chart bars to see detailed information for specific days
- **Statistical Insights**: View your average mood and sleep from the past five check-ins and compare with previous periods
- **Profile Management**: 
  - Update your name and profile photo
  - Automatic image compression for optimal storage
  - Custom avatar support with placeholder options
- **Data Privacy**: User-specific mood data with secure access controls
- **Responsive Design**: Fully responsive interface that works on all devices

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS
- **Authentication**: Firebase Authentication
- **Database**: MongoDB
- **State Management**: Zustand
- **Design System**: Custom UI components
- **Data Visualization**: Custom chart components
- **API Layer**: Next.js API routes with Firebase Admin authentication
- **Image Processing**: Client-side image compression and optimization

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or pnpm
- MongoDB database
- Firebase project with Authentication enabled

### Development Setup

> **Note:** These instructions are for development purposes. For production deployment, please contact the system administrator.

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
Create a `.env.local` file with the following variables:
```
# Required Environment Variables
# Contact the system administrator for production values
# For development, you'll need to set up your own Firebase project and MongoDB instance

# MongoDB
MONGODB_URI=your_mongodb_connection_string

# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id

# Firebase Admin
FIREBASE_ADMIN_PROJECT_ID=your_firebase_admin_project_id
FIREBASE_ADMIN_CLIENT_EMAIL=your_firebase_admin_client_email
FIREBASE_ADMIN_PRIVATE_KEY=your_firebase_admin_private_key
```

4. Start Development Server
```bash
npm run dev
# or
pnpm dev
```

The development server will be available at [http://localhost:3000](http://localhost:3000)

## Production Deployment

For production deployment, the application requires:

1. A properly configured MongoDB database
2. Firebase project with Authentication enabled
3. Firebase Admin service account
4. Secure environment for storing sensitive credentials
5. Node.js hosting environment (e.g., Vercel, AWS, etc.)

Please contact the system administrator for deployment access and credentials.

## Security Features

- Secure user authentication with Firebase Auth
- API routes protected with Firebase Admin authentication
- User-specific data access controls
- Secure image handling and storage
- Environment variable protection for sensitive credentials

## License

MIT 