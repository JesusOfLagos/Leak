
import cors, { CorsOptions } from 'cors';

export class Cors {
    public corsOptions: CorsOptions = {
        origin: ['https://ubiquitous-meerkat-c2d8e5.netlify.app', 'http://localhost:3000/'],
        optionsSuccessStatus: 200,
        credentials: true,
        methods: ['GET', 'PUT', 'POST', 'DELETE', 'PATCH', 'OPTIONS'],
        allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization', 'Set-Cookie', 'Cookie'],
        exposedHeaders: ['Set-Cookie', 'Cookie'],
    };
}
