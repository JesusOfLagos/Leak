import express, { Express, NextFunction, Request, Response } from 'express';
import cors from 'cors'
import { Cors, config, connectToDB } from './index.config';
import { sensorRouter } from './router';


export const Leak: Express = express();
const leakCors = new Cors;

Leak.use(express.json());
Leak.use(express.urlencoded({ extended: true }));
Leak.use(cors(LeakCors.corsOptions))

Leak.use('/api/v1/app/sensors', sensorRouter)

Leak.use((req: Request, res: Response, next: NextFunction) => {
    return res.status(404).json({ message: 'This Request does not sit with Retty API' });
})

Leak.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
});
connectToDB();
Leak.listen(config.app.port, () => {
    console.log(`Server started on port ${config.app.port}`);
})
