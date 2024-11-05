import { Request, Response } from 'express';
import { fetchData } from './sensor.services';

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

export const getFeeds = async (req: Request, res: Response) => {
    try {
        const rawFeeds = await fetchData();
        const structuredFeeds = formatFeedData(rawFeeds);
        res.json(structuredFeeds);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};
