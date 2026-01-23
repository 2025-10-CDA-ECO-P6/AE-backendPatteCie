import express from 'express';
import 'dotenv/config';
import authRoute from './routes/authRoute.js';
import userRoute from "./routes/userRoute.js";
import animalRoute from "./routes/animalRoute.js";
import visitRoute from "./routes/visitRoute.js";
import treatmentRoute from "./routes/treatmentRoute.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "../swagger.js";


const app = express();

app.use(cookieParser());

app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/animals", animalRoute);
app.use("/api/visits", visitRoute);
app.use("/api/treatments", treatmentRoute);

export default app;