# 🎬 Movie Watchlist Manager

A full-stack MERN application for managing your movie watchlist with AI-powered recommendations. Built with React, Node.js, Express, and MongoDB.

## ✨ Features

- **Movie Management**: Add, edit, delete movies with ratings and status tracking
- **Watchlist Categories**: Organize movies by status (Will Watch, Watching, Watched)
- **Smart Search**: Search movies by title or genre
- **AI Recommendations**: Chatbot that suggests movies based on your preferences
- **Netflix-like UI**: Beautiful, responsive design with smooth animations
- **Real-time Updates**: Instant CRUD operations with backend API

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation & Setup

1. **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   ```

2. **Install Frontend Dependencies**
   ```bash
   cd frontend
   npm install
   ```

3. **Start MongoDB**
   - Local: Make sure MongoDB is running on `mongodb://localhost:27017`
   - Atlas: Update the connection string in `backend/server.js`

4. **Start Backend Server**
   ```bash
   cd backend
   npm run dev
   ```
   Server runs on: http://localhost:5000

5. **Start Frontend Development Server**
   ```bash
   cd frontend
   npm run dev
   ```
   App runs on: http://localhost:3000

## 🎯 Usage

1. **Add Movies**: Click "Add Movie" button to add new movies to your watchlist
2. **Manage Status**: Change movie status between "Will Watch", "Watching", "Watched"
3. **Search & Filter**: Use the search bar and status filter to find specific movies
4. **Get Recommendations**: Click "Get Recommendations" to chat with the AI bot
5. **Edit/Delete**: Hover over movie cards to edit or delete movies

## 🛠️ Tech Stack

### Frontend
- **React 18** with functional components and hooks
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Axios** for API calls
- **Swiper** for carousel components

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **CORS** for cross-origin requests
- **dotenv** for environment variables

## 📁 Project Structure

```
movie-watchlist/
├── backend/
│   ├── server.js          # Express server with API routes
│   └── package.json       # Backend dependencies
├── frontend/
│   ├── src/
│   │   ├── components/    # React components
│   │   │   ├── Hero.jsx
│   │   │   ├── MovieCard.jsx
│   │   │   ├── MovieList.jsx
│   │   │   ├── MovieForm.jsx
│   │   │   └── MovieRecommendations.jsx
│   │   ├── services/
│   │   │   └── api.js     # API service layer
│   │   ├── App.jsx        # Main app component
│   │   └── main.jsx       # React entry point
│   └── package.json       # Frontend dependencies
└── README.md
```

## 🎨 Features in Detail

### Movie Management
- **CRUD Operations**: Full create, read, update, delete functionality
- **Rich Metadata**: Title, poster, description, rating, genre, status
- **Status Tracking**: Three watchlist categories with color coding
- **Star Ratings**: Interactive 5-star rating system

### AI Recommendations
- **Smart Suggestions**: Bot recommends movies based on genre preferences
- **Chat Interface**: Real-time chat with typing indicators
- **Context Awareness**: Considers your current watchlist and preferences

### UI/UX
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Dark Theme**: Netflix-inspired dark color scheme
- **Smooth Animations**: Hover effects, transitions, and loading states
- **Modern Typography**: Clean, readable fonts with proper hierarchy

## 🔧 API Endpoints

- `GET /api/movies` - Get all movies
- `POST /api/movies` - Create new movie
- `PUT /api/movies/:id` - Update movie
- `DELETE /api/movies/:id` - Delete movie
- `GET /api/movies/search?q=query&genre=genre` - Search movies

## 🎬 Sample Data

The app comes with pre-loaded sample movies including:
- The Dark Knight (Action)
- Inception (Sci-Fi)
- Pulp Fiction (Crime)
- The Shawshank Redemption (Drama)
- Interstellar (Sci-Fi)

## 🚀 Deployment

### Backend Deployment
1. Deploy to Heroku, Railway, or similar
2. Set environment variables: `MONGODB_URI`, `PORT`
3. Update CORS settings for production domain

### Frontend Deployment
1. Build the app: `npm run build`
2. Deploy to Vercel, Netlify, or similar
3. Update API base URL in `services/api.js`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---

**Ready to watch? Start the servers and enjoy your movie management experience! 🍿**
