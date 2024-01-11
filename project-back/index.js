import  express  from "express";
import AppRoutes from './routes/AppRoutes.js';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import bcrypt from 'bcrypt';
import 'dotenv/config';


const app = express()
const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
  };
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(AppRoutes);
const PORT = process.env.PORT || 3000
app.listen(process.env.PORT || 3000);



console.log(`server on port ${PORT}`)