import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import authRoutes from "./routes/auth.routes.js";
import resumeRoutes from "./routes/resume.routes.js";
import aiRoutes from "./routes/ai.routes.js";
import jobRoutes from "./routes/job.routes.js";
import careerRoutes from "./routes/career.routes.js";
import applicationRoutes from "./routes/application.routes.js";
import roadmapRoutes from "./routes/roadmap.routes.js";
import improvementRoutes from "./routes/improvement.routes.js";
import interviewRoutes from "./routes/interview.routes.js";
import interviewSessionRoutes from "./routes/interviewSession.routes.js";
import interviewReportRoutes from "./routes/interviewReport.routes.js";
import session from "express-session";
import helmet from "helmet";
import { globalLimiter } from "./middlewares/rateLimiter.js";
import { errorHandler } from "./middlewares/error.middleware.js";
import path from "path";

const app = express();
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));
app.use(helmet());
app.use(globalLimiter);
app.use(errorHandler);

app.use("/api/auth", authRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/analysis", aiRoutes);
app.use("/api/job", jobRoutes);
app.use("/api/career", careerRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/roadmap", roadmapRoutes);
app.use("/api/improvement", improvementRoutes);
app.use("/api/interview-prep", interviewRoutes);
app.use("/api/interview-session", interviewSessionRoutes);
app.use("/api/interview-report", interviewReportRoutes);
export default app;
