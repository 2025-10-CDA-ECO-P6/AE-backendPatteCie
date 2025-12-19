import express from 'express';
import 'dotenv/config';
import authRoute from './routes/authRoute.js';
import userRoute from "./routes/userRoute.js";
// import userRoutes from "./routes/visitRoute.js";

const app = express();

app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
// app.use("/api/visit", visitRoute);

export default app;