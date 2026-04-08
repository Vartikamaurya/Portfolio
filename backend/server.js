import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import errorHandler from './middleware/errorMiddleware.js';
import blogRoutes from './routes/blogRoutes.js';
import chatbotRoutes from './routes/chatbotRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import projecRoutes from './routes/projectRoutes.js';
import resumeRoutes from './routes/resumeRoutes.js';
const app = express();
import cors from 'cors';

dotenv.config();

const PORT = process.env.PORT || 3000;
// Connect to MongoDB
connectDB();

const allowedOrigins = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error(`CORS blocked for origin: ${origin}`));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/chatbot', chatbotRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/projects', projecRoutes);
app.use('/api/resume', resumeRoutes);

// Error handling middleware
app.use(errorHandler);


// Start the server 
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
