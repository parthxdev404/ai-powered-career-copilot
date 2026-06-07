import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import authRoutes from "./routes/auth.routes.js"
import passport, { session } from "passport";
import './config/passport.js'
import rateLimit from "express-rate-limit"


const app = express();
const limiter = rateLimit({
  windowMs : 15 * 60 * 1000,
  max : 100,
})

app.use(cors());
app.use(express.json());
app.use(cookieParser());                                                                        
app.use(morgan("dev"));
app.use(helmet());
app.use(limiter)
app.use(
  session({
    secret : process.env.JWT_SECRET,
    resave : true,
    saveUninitialized : false,
  })
)

app.use(passport.initialize());
app.use(passport.session());


app.use("/api/auth" , authRoutes);

export default app;
