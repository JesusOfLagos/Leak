import axios from 'axios';
import config from '../../config/config';

const AIO_KEY = config.keys.aio_key;
const USER_NAME = config.keys.aio_username;
const FEED_KEY = config.keys.aio_feed_key;

const BASE_URL = `https://io.adafruit.com/api/v2/${USER_NAME}/feeds`;

export async function fetchData(): Promise<any> {
    try {
        const response = await axios.get(BASE_URL, {
            headers: { 'X-AIO-Key': AIO_KEY }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

async function sendData(value: number): Promise<void> {
    try {
        const response = await axios.post(BASE_URL, { value }, {
            headers: { 'X-AIO-Key': AIO_KEY }
        });
        console.log('Data sent successfully:', response.data);
    } catch (error) {
        console.error('Error sending data:', error);
    }
}

async function getRecentData(): Promise<void> {
    try {
        const response = await axios.get(`${BASE_URL}/${FEED_KEY}/data/retain`, {
            headers: { 'X-AIO-Key': AIO_KEY }
        });
        console.log('Recent data:', response.data);
    } catch (error) {
        console.error('Error fetching recent data:', error);
    }
}


