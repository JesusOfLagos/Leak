import { Request, Response } from 'express';
import { getSensorData, alertLeak } from './sensor';

export const getLeakStatus = async (req: Request, res: Response) => {
    try {
        const sensorData = await getSensorData();
        if (sensorData.isLeaking) {
            res.status(200).json({ message: 'Leak detected!', data: sensorData });
        } else {
            res.status(200).json({ message: 'No leaks detected', data: sensorData });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching sensor data', error });
    }
};

export const triggerLeakAlert = async (req: Request, res: Response) => {
    try {
        await alertLeak();
        res.status(200).json({ message: 'Leak alert triggered!' });
    } catch (error) {
        res.status(500).json({ message: 'Error triggering leak alert', error });
    }
};
