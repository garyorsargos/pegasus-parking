# 🚗 Pegasus Parking

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Chakra UI](https://img.shields.io/badge/Chakra_UI-319795?style=flat&logo=chakra-ui&logoColor=white)](https://chakra-ui.com/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=flat&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=flat&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)

> 🎓 A smart parking solution helping UCF students and faculty find the best parking spots on campus!

## 🌟 Features

- 🔍 Real-time parking spot availability tracking
- 📱 Responsive web application optimized for mobile use
- 🗺️ Interactive campus parking map using Google Maps API
- 🔐 User authentication and session management

## 🏗️ Project Structure

```
pegasus-parking/
├── frontend/                # React + TypeScript frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── context/       # React context providers
│   │   ├── utils/         # Utility functions
│   │   └── assets/        # Static assets
│   └── ...
├── server/                 # Express.js backend
│   ├── controllers/       # Route handlers
│   ├── models/           # MongoDB models
│   ├── utils/            # Utility functions
│   ├── config/          # Server configuration
│   └── index.js         # Server entry point
└── database/              # Database documentation and scripts
```

## 🛠️ Tech Stack

### Frontend
- **React 18** with **TypeScript** - Modern, type-safe UI development
- **Vite** - Next-generation frontend tooling
- **Chakra UI** - Accessible and customizable component library
- **@react-google-maps/api** - Google Maps integration
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client
- **Framer Motion** - Animations

### Backend
- **Express.js** - Fast, unopinionated web framework
- **MongoDB** with **Mongoose** - NoSQL database with elegant modeling
- **Passport.js** - Authentication middleware
- **Express Session** - Session management

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- MongoDB
- npm or yarn
- Google Maps API key

### Installation

1. Clone the repository
```bash
git clone https://github.com/garyorsargos/pegasus-parking.git
cd pegasus-parking
```

2. Install dependencies
```bash
# Install root dependencies
npm install

# Install frontend dependencies
cd frontend
npm install

# Install server dependencies
cd ../server
npm install
```

3. Set up environment variables

Create `.env` files in both frontend and server directories:

Frontend `.env`:
```env
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
VITE_API_URL=http://localhost:3000
```

Server `.env`:
```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
SESSION_SECRET=your_session_secret
```

4. Start the development servers

In one terminal:
```bash
# Start the backend server
cd server
npm start
```

In another terminal:
```bash
# Start the frontend development server
cd frontend
npm run dev
```

The application will be available at `http://localhost:5173`

## 💻 Development

### Frontend Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Lint code
- `npm run preview` - Preview production build

### API Documentation

The backend API includes the following main endpoints:

- `GET /api/parking-spots` - Get all parking spots
- `GET /api/parking-spots/:id` - Get specific parking spot
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/analytics` - Get parking analytics

Full API documentation is available in the server directory.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
