import express from 'express';
import 'dotenv/config';
import authRoute from './routes/authRoute.js';
import userRoutes from "./routes/userRoute.js";
import userRoute from "./routes/userRoute.js";

const app = express();


app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);

export default app;