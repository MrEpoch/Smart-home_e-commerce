import express from 'express';
import router from './Routes/router-admin_api';
import cors from 'cors';
import { log_in_admin } from './handlers/user';
import { create_access_admin, protect_admin_api_route as protectRoute } from './modules/auth';
import { body } from 'express-validator';
import { handleError } from './modules/middleware';
import morgan from 'morgan';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.post('/server/login', 
    body('email').isString().isEmail(),
    body('password').isString().isLength({ min: 1 })
,handleError ,log_in_admin);

app.get("/server/admin-token", create_access_admin);

app.use("/server/admin-api", protectRoute, router);
app.use('/uploads', express.static('uploads'));

export default app;

