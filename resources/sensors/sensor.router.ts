import { Router } from 'express';
import { getFeeds } from './sensor';
import { Authenticator } from '../../config/authenticator';


const authenticator = new Authenticator();

export const sensorRouter = Router();

sensorRouter.get('/status', authenticator.isLoggedIn, getFeeds);  

