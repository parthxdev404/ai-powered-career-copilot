import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import authRoutes from "./routes/auth.routes.js";
import resumeRoutes from "./routes/resume.routes.js";
import aiRoutes from "./routes/ai.routes.js";
import jobRoutes from "./routes/job.routes.js";
import careerRoutes from "./routes/career.routes.js";
import applicationRoutes from "./routes/application.routes.js"
import passport from "passport";
import session from "express-session"
import "./config/passport.js";
import rateLimit from "express-rate-limit";
import helmet from 'helmet'

const app = express();
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(helmet());
app.use(limiter);
// app.use(
//   session({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: false,
//   }),
// );

// app.use(passport.initialize());
// app.use(passport.session());

app.use("/api/auth", authRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/job" , jobRoutes);
app.use("/api/career" , careerRoutes);
app.use("/api/applications" , applicationRoutes)
export default app;
