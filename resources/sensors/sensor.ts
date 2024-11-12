import { Request, Response } from 'express';
import { fetchData } from './sensor.services';
import { sendMail } from '../../config/mail';
import { User } from '../auth/auth.model';

interface Feed {
    id: number;
    name: string;
    lastValue: string;
    status: string;
    createdAt: string;
    updatedAt: string;
}

const alertLog: { timestamp: number; status: string }[] = [];

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

const checkAlertCondition = () => {
    const now = Date.now();
    while (alertLog.length && alertLog[0].timestamp < now - 30000) {
        alertLog.shift();
    }

    const alertCount = alertLog.filter(log => log.status === 'ALERT').length;

    return alertCount >= 2;
};

export const getFeeds = async (req: any, res: Response) => {
    try {
        const userEmail = req.user.email;
        const user = await User.findOne({ email: userEmail })
        const firstname = user?.firstname || 'User';
        const lastname = user?.lastname || '';
        const name =  `${firstname} ${lastname}`;
        const rawFeeds = await fetchData();
        const structuredFeeds = formatFeedData(rawFeeds);

        const leakageAlertFeed = structuredFeeds.find(feed => feed.name === 'leakage_alert');

        if (leakageAlertFeed) {
            alertLog.push({ timestamp: Date.now(), status: leakageAlertFeed.lastValue });
        }

        if (checkAlertCondition()) {
            const alertDetails = structuredFeeds.find(feed => feed.name === 'flow_rate_difference');
            const subject = 'Urgent: Leak Detected in Your Pipeline System';
            const text = `
Dear ${name},

Our monitoring system at *LeakAlert* has detected a significant anomaly in your pipeline flow. The flow rate difference has exceeded the safety threshold, indicating a potential leak or other critical issue in your system.

Alert Details:
- Location: [Specify zone or pipeline if available]
- Flow Rate Difference: ${alertDetails ? alertDetails.lastValue : 'N/A'}
- Timestamp: ${new Date().toISOString()}

This incident requires immediate attention to prevent potential damage, environmental hazards, or operational downtime. Please review the incident in the *LeakAlert* app.

Stay safe,
The LeakAlert Team  
[Support Contact Information]  
[Company Website]
            `;
            const mailSent = sendMail(subject, text, userEmail);

            if (!mailSent) {
                return res.json({ structuredFeeds, error: 'Error sending alert email' });
            }
        }

        res.json({ structuredFeeds, error: '' });
    } catch (error) {
        res.status(500).json({ error });
    }
};
