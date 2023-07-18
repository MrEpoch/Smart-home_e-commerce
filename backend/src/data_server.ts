import express from 'express';
import router from './Routes/data_router';
import cors from 'cors';
import { protectRoute } from './modules/auth';
import morgan from 'morgan';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use("/server/data", protectRoute, router);

export default app;
