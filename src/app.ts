import express, { Request, Response } from 'express';
import path from 'path';

const api = express();
api.use(express.json());

api.use(express.static('./public'))
    .get('/', (req:Request, res:Response) => {
        res.sendFile(path.join(__dirname, '/public/index.html'));
    });

api.listen(3000, () => console.log('Start App'));
