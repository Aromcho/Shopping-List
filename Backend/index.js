import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import connectDB from './config/db.config.js';
import dotenv from 'dotenv';
import router from './routes/index.router.js';
import errorHandler from './middlewares/errorHndler.mid.js';
import cookieParser from 'cookie-parser';



dotenv.config();
const app = express();

connectDB();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser());

app.use('/api', router);

app.listen(process.env.PORT , () => {
    console.log('Server is running on port ' + process.env.PORT);
});

app.use(errorHandler);
