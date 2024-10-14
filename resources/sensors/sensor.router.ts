import { Router } from 'express';
import { getLeakStatus, triggerLeakAlert } from './sensor.controller';

export const sensorRouter = Router();

sensorRouter.get('/status', getLeakStatus);  
sensorRouter.post('/alert', triggerLeakAlert);  
