import express from 'express';
import router from './router';
import cors from 'cors';
import { createNewUser, signIn } from './handlers/user';
import { protectRoute } from './modules/auth';
import { body } from 'express-validator';
import { handleError } from './modules/middlewares';
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
app.use("/server/api", protectRoute, router);

export default app;
