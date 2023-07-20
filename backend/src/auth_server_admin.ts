import express from 'express';
import router from './Routes/router-admin_api';
import cors from 'cors';
import { createNewUser, signIn } from './handlers/user';
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
    body('username').isString().isLength({ min: 0, max: 30}),
    body('password').isString().isLength({ min: 1 })
,handleError ,signIn);
app.post('/server/signup', 
    body('username').isString().isLength({ min: 0, max: 30}),
    body('email').isEmail(),
    body('password').isString().isLength({ min: 1 })
,handleError, createNewUser);

app.post("/server/admin-token", create_access_admin);

app.use("/server/admin_api", protectRoute, router);

export default app;
