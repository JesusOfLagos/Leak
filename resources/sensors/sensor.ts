import { Request, Response } from 'express';
import { fetchData } from './sensor.services';
import { sendMail } from '../../config/mail';



interface Feed {
    id: number;
    name: string;
    lastValue: string;
    status: string;
    createdAt: string;
    updatedAt: string;
}

const formatFeedData = (rawData: any[]): Feed[] => {
    return rawData.map(feed => ({
        id: feed.id,
        name: feed.name,
        lastValue: feed.last_value,
        status: feed.status,
        createdAt: feed.created_at,
        updatedAt: feed.updated_at,
    }));
};

export const getFeeds = async (req: any, res: Response) => {
    try {
        const userEmail = req.user.email;
        const rawFeeds = await fetchData();
        const structuredFeeds = formatFeedData(rawFeeds);
        const subject = 'Sensor Update';
        const text = `Most recent sensor data: ${JSON.stringify(structuredFeeds)}
        
        Regards,
        Leak Detection Team.`;
        const to = userEmail;
        const mailSent = sendMail(subject, text, to);
        let error = '';
        if (!mailSent) {
            error = 'Error sending email';
        }
        res.json({ structuredFeeds, error });
    } catch (error) {
        res.status(500).json({ error });
    }
};
