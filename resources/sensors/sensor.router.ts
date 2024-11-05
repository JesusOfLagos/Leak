import { Router } from 'express';
import { getFeeds } from './sensor';

export const sensorRouter = Router();

sensorRouter.get('/status', getFeeds);  

