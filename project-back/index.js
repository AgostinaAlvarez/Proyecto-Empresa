/*

const app = express();

const PORT = process.env.PORT || 3000

app.use(AppRoutes);
app.use(express.json());
app.use(cors());
app.listen(PORT);

*/

import  express  from "express";
import AppRoutes from './routes/AppRoutes.js'
import cors from 'cors'



const app = express()
app.use(cors());
app.use(express.json());
app.use(AppRoutes);
app.listen(process.env.PORT || 3000);


console.log('server on port 4000')