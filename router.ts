import { Router } from 'express';
import { getLeakStatus, triggerLeakAlert } from './controller';

const router = Router();

router.get('/status', getLeakStatus);  
router.post('/alert', triggerLeakAlert);  

export default router;
