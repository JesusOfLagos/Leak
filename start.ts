import express, { Express, NextFunction, Request, Response } from 'express';
import cors from 'cors'
import { Cors, config, connectToDB } from './config/index.config';
import { sensorRouter } from './resources/sensors/sensor.router';
import { authRouter } from './resources/auth/auth.router';
import { fetchData } from './resources/sensors/sensor.services';




export const Leak: Express = express();
// const leakCors = new Cors;

Leak.use(express.json());
Leak.use(express.urlencoded({ extended: true }));
Leak.use(cors(
    {
        origin: '*',
        allowedHeaders: ['Content-Type', 'Authorization'],
        methods: ['GET', 'POST', 'PUT', 'DELETE']
    }
));

Leak.use('/api/v1/app/sensors', sensorRouter)
Leak.use('/api/v1/auth', authRouter)


Leak.use((req: Request, res: Response, next: NextFunction) => {
    return res.status(404).json({ message: 'This Request does not sit with Retty API' });
})

Leak.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
});


fetchData()


connectToDB();
Leak.listen(config.app.port, () => {
    console.log(`Server started on port ${config.app.port}`);
})

