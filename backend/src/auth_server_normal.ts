import express from 'express';
import router from './Routes/router-normal_api';
import cors from 'cors';
import { createNewUser, signIn } from './handlers/user';
import { create_access_normal, protect_normal_api_route as protectRoute } from './modules/auth';
import { body } from 'express-validator';
import { handleError } from './modules/middleware';
import morgan from 'morgan';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.post('/server/normal-login', 
    body('username').isString().isLength({ min: 0, max: 30}),
    body('password').isString().isLength({ min: 1 })
,handleError ,signIn);
app.post('/server/normal-signup', 
    body('username').isString().isLength({ min: 0, max: 30}),
    body('email').isEmail(),
    body('password').isString().isLength({ min: 1 })
,handleError, createNewUser);

app.post("/server/normal-token", create_access_normal);

app.use("/server/normal-api", protectRoute, router);

export default app;
