import express from 'express';
import 'dotenv/config';

const app = express();

console.log(process.env.DATABASE_URL);

app.use(express.json());

export default app;