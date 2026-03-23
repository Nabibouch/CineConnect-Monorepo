import express from "express";
import cors from "cors";
import router from "./routes/global.route.js";
import usersRouter from './routes/users.route.js';
import filmsRouter from './routes/films.route.js';
import conversationsRouter from './routes/conversations.route.js'

const app = express();

// CORS en premier sur toutes les routes
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

// Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api", router);
app.use('/users', usersRouter);
app.use('/films', filmsRouter);
app.use('/conversations', conversationsRouter);

export default app;
