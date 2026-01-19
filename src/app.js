import express from 'express';
import 'dotenv/config';
import authRoute from './routes/authRoute.js';
import userRoute from "./routes/userRoute.js";
import animalRoute from "./routes/animalRoute.js";
import visitRoute from "./routes/visitRoute.js";
import treatmentRoute from "./routes/treatmentRoute.js";

const app = express();

app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/animals", animalRoute);
app.use("/api/visits", visitRoute);
app.use("/api/treatments", treatmentRoute);

export default app;